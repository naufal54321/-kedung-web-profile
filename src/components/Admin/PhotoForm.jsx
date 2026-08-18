import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import { FaCamera } from 'react-icons/fa'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'

function PhotoForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({ imgUrl: '', caption: '', order: null })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    const loadFoto = async () => {
      try {
        const all = await api.getAllFotos()
        const foto = all.find(f => f.id === id)
        if (foto) {
          setForm({ imgUrl: foto.imgUrl || '', caption: foto.caption || '', order: foto.order ?? 0 })
        } else {
          setError('Foto tidak ditemukan')
        }
      } catch {
        setError('Gagal memuat foto')
      }
      setFetching(false)
    }
    loadFoto()
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUploadImage = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadToImgBB(file)
      setForm(prev => ({ ...prev, imgUrl: url }))
    } catch {
      setError('Gagal upload gambar')
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.imgUrl.trim()) {
      setError('Foto wajib diunggah atau URL gambar diisi.')
      return
    }
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
        setForm({ imgUrl: '', caption: '', order: null })
      }
    } catch {
      setError('Gagal menyimpan foto')
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
    <AdminLayout title={isEdit ? 'Edit Foto' : 'Tambah Foto'}>
    <Container className="pb-4" style={{ maxWidth: 800 }}>
      <Card className="admin-form-card">
        <Card.Body className="admin-form-body">

          {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

          <div className="admin-form-header">
            <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            <p className="mb-0 text-muted small">Foto akan tampil di Galeri Foto halaman Beranda. Gunakan tombol naik/turun di daftar Foto untuk mengatur urutannya.</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <Form.Label><FaCamera className="me-1 text-success" /> Upload Foto</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadImage(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading && (
                <Image src={form.imgUrl} rounded style={{ maxHeight: 180, objectFit: 'cover' }} className="mt-1" />
              )}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL gambar manual" className="admin-input mt-2" />
            </div>

            <div className="admin-input-group">
              <Form.Label>Caption / Keterangan (opsional)</Form.Label>
              <Form.Control type="text" name="caption" value={form.caption} onChange={handleChange} placeholder="Misal: Kegiatan gotong royong 2026" className="admin-input" />
            </div>

            <div className="d-flex gap-2 mt-4">
              <Button className="admin-btn-primary" type="submit" disabled={loading || uploading}>
                {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Foto'}
              </Button>
              <Button className="admin-btn-secondary" onClick={() => navigate('/admin/foto')}>Batal</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </AdminLayout>
  )
}

export default PhotoForm