import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import { FaYoutube } from 'react-icons/fa'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'

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

function VideoForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [rssVideos, setRssVideos] = useState([])
  const [form, setForm] = useState({ url: '', title: '', published: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/youtube-videos.js')
      .then(r => r.json())
      .then(res => setRssVideos(res.videos || []))
      .catch(() => setRssVideos([]))
  }, [])

  useEffect(() => {
    if (!isEdit) return
    const loadVideo = async () => {
      try {
        const all = await api.getAllVideos()
        const video = all.find(v => v.id === id)
        if (video) {
          setForm({ url: video.videoId || '', title: video.title || '', published: video.published || '' })
        } else {
          setError('Video tidak ditemukan')
        }
      } catch {
        setError('Gagal memuat video')
      }
      setFetching(false)
    }
    loadVideo()
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRssSelect = (e) => {
    const vid = rssVideos.find(v => v.videoId === e.target.value)
    if (vid) {
      setForm({ url: `https://www.youtube.com/watch?v=${vid.videoId}`, title: vid.title, published: vid.published || '' })
    }
  }

  const videoId = parseYouTubeId(form.url)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!videoId) {
      setError('URL atau ID video YouTube tidak valid. Contoh: https://www.youtube.com/watch?v=xxxxx atau ID 11 karakter.')
      return
    }
    if (!form.title.trim()) {
      setError('Judul video wajib diisi.')
      return
    }
    setLoading(true)
    const payload = { videoId, title: form.title.trim(), published: form.published || '' }
    try {
      if (isEdit) {
        await api.updateVideo(id, payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Video berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        const all = await api.getAllVideos()
        const maxOrder = all.reduce((m, v) => Math.max(m, v.order || 0), 0)
        await api.createVideo({ ...payload, order: maxOrder + 1 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Video berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ url: '', title: '', published: '' })
      }
    } catch {
      setError('Gagal menyimpan video')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Video' : 'Tambah Video'}>
    <Container className="pb-4" style={{ maxWidth: 800 }}>
      <Card className="admin-form-card">
        <Card.Body className="admin-form-body">

          {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

          <div className="admin-form-header">
            <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            <p className="mb-0 text-muted small">Video yang ditambahkan akan tampil di halaman Beranda. Gunakan tombol naik/turun di daftar Video untuk mengatur urutannya.</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <Form.Label><FaYoutube className="me-1 text-danger" /> Pilih dari Video Terbaru Channel</Form.Label>
              <Form.Select value="" onChange={handleRssSelect} className="admin-input">
                <option value="">— Pilih video —</option>
                {rssVideos.map((v) => (
                  <option key={v.videoId} value={v.videoId}>{v.title}</option>
                ))}
                {rssVideos.length === 0 && <option value="" disabled>Video tidak dapat dimuat</option>}
              </Form.Select>
              <Form.Text className="text-muted">Atau masukkan URL / ID video secara manual di bawah.</Form.Text>
            </div>

            <Row>
              <Col md={12}>
                <div className="admin-input-group">
                  <Form.Label>URL atau ID YouTube <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="url" value={form.url} onChange={handleChange} required placeholder="https://www.youtube.com/watch?v=..." className="admin-input" />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <div className="admin-input-group">
                  <Form.Label>Judul Video <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required className="admin-input" />
                </div>
              </Col>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>Tanggal Upload</Form.Label>
                  <Form.Control type="text" name="published" value={form.published} onChange={handleChange} placeholder="2026-08-01" className="admin-input" />
                  <Form.Text className="text-muted">Format: YYYY-MM-DD</Form.Text>
                </div>
              </Col>
            </Row>

            {videoId && (
              <div className="d-flex align-items-center gap-3 mt-3 p-3 bg-light rounded">
                <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} rounded style={{ width: 160, height: 90, objectFit: 'cover' }} />
                <div>
                  <p className="fw-medium mb-1">{form.title || 'Judul akan tampil di sini'}</p>
                  <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="small text-decoration-none">
                    youtube.com/watch?v={videoId}
                  </a>
                </div>
              </div>
            )}

            <div className="d-flex gap-2 mt-4">
              <Button className="admin-btn-primary" type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Video'}
              </Button>
              <Button className="admin-btn-secondary" onClick={() => navigate('/admin/video')}>Batal</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </AdminLayout>
  )
}

export default VideoForm