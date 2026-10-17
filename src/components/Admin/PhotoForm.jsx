import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import { FaCamera } from 'react-icons/fa'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function PhotoForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ imgUrl: '', caption: '', order: null })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ imgUrl: '', caption: '', order: null })
    setError('')
    if (isEdit) {
      setFetching(true)
      const loadFoto = async () => {
        try {
          const all = await api.getAllFotos()
          const foto = all.find(f => f.id === id)
          if (foto) setForm({ imgUrl: foto.imgUrl || '', caption: foto.caption || '', order: foto.order ?? 0 })
          else setError('Foto tidak ditemukan')
        } catch (err) { setError('Gagal memuat foto: ' + (err?.message || '')) }
        setFetching(false)
      }
      loadFoto()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleUploadImage = async (file) => {
    if (!file) return
    setUploading(true); setError('')
    try { const url = await uploadToImgBB(file); setForm(prev => ({ ...prev, imgUrl: url })) }
    catch (err) { setError('Gagal upload gambar: ' + (err?.message || '')) }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    if (!form.imgUrl.trim()) { setError('Foto wajib diunggah atau URL gambar diisi.'); return }
    setLoading(true)
    const payload = { imgUrl: form.imgUrl.trim(), caption: form.caption.trim() }
    try {
      if (isEdit) {
        await api.updateFoto(id, { ...payload, order: form.order ?? 0 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Foto berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        const all = await api.getAllFotos()
        const maxOrder = all.reduce((m, f) => Math.max(m, f.order || 0), 0)
        await api.createFoto({ ...payload, order: maxOrder + 1 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Foto berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch (err) { setError('Gagal menyimpan foto: ' + (err?.message || '')) }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Foto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-photo">
            <Form.Group className="mb-3">
              <Form.Label><FaCamera className="me-1 text-success" /> Upload Foto</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading && <Image src={form.imgUrl} rounded style={{ maxHeight: 180, objectFit: 'cover' }} className="mt-1" />}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL gambar manual" className="admin-input mt-2" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Caption / Keterangan (opsional)</Form.Label>
              <Form.Control type="text" name="caption" value={form.caption} onChange={handleChange} placeholder="Misal: Kegiatan gotong royong 2026" className="admin-input" />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-photo" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Foto'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PhotoForm
