import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function CarouselForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ imageUrl: '', caption: '', subtitle: '', order: null })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ imageUrl: '', caption: '', subtitle: '', order: null })
    setError('')
    if (isEdit) {
      setFetching(true)
      const fetchData = async () => {
        try {
          const all = await api.getAllCarousels()
          const item = all.find((c) => c.id === id)
          if (item) setForm({ imageUrl: item.imageUrl || '', caption: item.caption || '', subtitle: item.subtitle || '', order: item.order ?? item.sortOrder ?? null })
          else setError('Data tidak ditemukan')
        } catch (err) { setError('Gagal memuat data: ' + (err?.message || '')) }
        setFetching(false)
      }
      fetchData()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true); setError('')
    try { const url = await uploadToImgBB(file); setForm((prev) => ({ ...prev, imageUrl: url })) }
    catch (err) { setError('Gagal upload gambar: ' + (err?.message || '')) }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (isEdit) {
        await api.updateCarousel(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Slide berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        const all = await api.getAllCarousels()
        const maxOrder = all.reduce((m, c) => Math.max(m, c.order ?? c.sortOrder ?? 0), 0)
        await api.createCarousel({ ...form, order: maxOrder + 1 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Slide berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch (err) { setError('Gagal menyimpan: ' + (err?.message || '')) }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Slide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-carousel">
            <Form.Group className="mb-3">
              <Form.Label>Gambar Slide <span className="text-danger">*</span></Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imageUrl && !uploading && <Image src={form.imageUrl} thumbnail style={{ maxHeight: 120 }} />}
              <Form.Control type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teks Caption <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="caption" value={form.caption} onChange={handleChange} placeholder="Selamat Datang..." required className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control type="text" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Website resmi Padukuhan Kedung..." className="admin-input" />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-carousel" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Slide'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CarouselForm
