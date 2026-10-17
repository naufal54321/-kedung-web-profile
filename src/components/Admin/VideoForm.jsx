import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import { FaYoutube, FaSync } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { formatDate } from '../../utils/formatDate'

function parseYouTubeId(input) {
  const trimmed = String(input || '').trim()
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed
  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  ]
  for (const re of patterns) {
    const m = trimmed.match(re)
    if (m) return m[1]
  }
  return null
}

function VideoForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [rssVideos, setRssVideos] = useState([])
  const [rssError, setRssError] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [form, setForm] = useState({ url: '', title: '', published: '', order: null })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')

  const loadRssVideos = async (force = false) => {
    setRssError('')
    try {
      const cacheBust = force ? `?refresh=${Date.now()}` : ''
      const res = await fetch(`/api/youtube-videos.js${cacheBust}`)
      const data = await res.json()
      const videos = Array.isArray(data.videos) ? data.videos : []
      if (videos.length > 0) { setRssVideos(videos); return }
      for (let attempt = 0; attempt < 3; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const res2 = await fetch(`/api/youtube-videos.js?refresh=${Date.now()}`)
        const data2 = await res2.json()
        const videos2 = Array.isArray(data2.videos) ? data2.videos : []
        if (videos2.length > 0) { setRssVideos(videos2); return }
      }
      setRssVideos([]); setRssError('Gagal memuat video. Coba lagi atau masukkan URL secara manual.')
    } catch { setRssVideos([]); setRssError('Gagal memuat video. Coba lagi atau masukkan URL secara manual.') }
  }

  useEffect(() => { if (show) { loadRssVideos(); setForm({ url: '', title: '', published: '', order: null }); setSelectedId(''); setError('') } }, [show])

  useEffect(() => {
    if (!show || !isEdit) return
    setFetching(true)
    const loadVideo = async () => {
      try {
        const all = await api.getAllVideos()
        const video = all.find(v => v.id === id)
        if (video) setForm({ url: video.videoId || '', title: video.title || '', published: video.published || '', order: video.order ?? 0 })
        else setError('Video tidak ditemukan')
      } catch { setError('Gagal memuat video') }
      setFetching(false)
    }
    loadVideo()
  }, [show, id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRssSelect = (e) => {
    const vid = rssVideos.find(v => v.id === e.target.value)
    if (vid) {
      setSelectedId(vid.id)
      setForm(prev => ({ url: `https://www.youtube.com/watch?v=${vid.id}`, title: vid.title, published: vid.published || '', order: prev.order }))
    }
  }

  const videoId = parseYouTubeId(form.url)

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    if (!videoId) { setError('Pilih video dari daftar, atau masukkan URL / ID video YouTube yang valid.'); return }
    if (!form.title.trim()) { setError('Judul video wajib diisi.'); return }
    setLoading(true)
    const payload = { videoId, title: form.title.trim(), published: form.published || '' }
    try {
      if (isEdit) {
        await api.updateVideo(id, { ...payload, order: form.order ?? 0 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Video berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        const all = await api.getAllVideos()
        const maxOrder = all.reduce((m, v) => Math.max(m, v.order || 0), 0)
        await api.createVideo({ ...payload, order: maxOrder + 1 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Video berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch { setError('Gagal menyimpan video') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-video">
            <Form.Group className="mb-3">
              <Form.Label><FaYoutube className="me-1 text-danger" /> Pilih dari Video Terbaru Channel</Form.Label>
              <Form.Select value={selectedId} onChange={handleRssSelect} className="admin-input">
                <option value="">— Pilih video —</option>
                {rssVideos.map((v) => (
                  <option key={v.id} value={v.id}>{v.title} — {v.published ? formatDate(v.published) : 'Tanpa tanggal'}</option>
                ))}
                {rssVideos.length === 0 && <option value="" disabled>{rssError || 'Memuat video...'}</option>}
              </Form.Select>
              <div className="d-flex align-items-center gap-2 mt-2">
                <Button variant="outline-success" size="sm" onClick={() => loadRssVideos(true)}><FaSync className="me-1" /> Muat Ulang</Button>
                {rssError && <span className="text-muted small">{rssError}</span>}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL atau ID YouTube (opsional)</Form.Label>
              <Form.Control type="text" name="url" value={form.url} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=..." className="admin-input" />
            </Form.Group>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Video <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Upload</Form.Label>
                  <Form.Control type="text" name="published" value={form.published} onChange={handleChange} placeholder="2026-08-01" className="admin-input" />
                  <Form.Text className="text-muted">Format: YYYY-MM-DD</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            {videoId && (
              <div className="d-flex align-items-center gap-3 mt-2 p-3 bg-light rounded">
                <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} rounded style={{ width: 160, height: 90, objectFit: 'cover' }} />
                <div>
                  <p className="fw-medium mb-1">{form.title || 'Judul akan tampil di sini'}</p>
                  <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="small text-decoration-none">youtube.com/watch?v={videoId}</a>
                </div>
              </div>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-video" disabled={loading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Video'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VideoForm
