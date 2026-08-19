import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'

function CarouselForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    imageUrl: '',
    caption: '',
    subtitle: '',
    order: null
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const all = await api.getAllCarousels()
          const item = all.find((c) => c.id === id)
          if (item) {
            setForm({
              imageUrl: item.imageUrl || '',
              caption: item.caption || '',
              subtitle: item.subtitle || '',
              order: item.order ?? item.sortOrder ?? null
            })
          } else {
            setError('Data tidak ditemukan')
          }
        } catch (error) {
          console.error('Gagal memuat data:', error)
          setError('Gagal memuat data: ' + (error?.message || error))
        }
        setFetching(false)
      }
      fetchData()
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadToImgBB(file)
      setForm((prev) => ({ ...prev, imageUrl: url }))
    } catch (error) {
      console.error('Gagal upload gambar:', error)
      setError('Gagal upload gambar: ' + (error?.message || error))
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isEdit) {
        await api.updateCarousel(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Slide berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        const all = await api.getAllCarousels()
        const maxOrder = all.reduce((m, c) => Math.max(m, c.order ?? c.sortOrder ?? 0), 0)
        await api.createCarousel({ ...form, order: maxOrder + 1 })
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Slide berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ imageUrl: '', caption: '', subtitle: '', order: null })
      }
    } catch (error) {
      console.error('Gagal menyimpan slide:', error)
      setError('Gagal menyimpan slide: ' + (error?.message || error))
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <AdminLayout title={isEdit ? 'Edit Slide' : 'Tambah Slide'}>
        <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="success" /></div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Slide' : 'Tambah Slide'}>
      <Container className="pb-4" style={{ maxWidth: 600 }}>
        <Card className="admin-form-card">
          <Card.Body className="admin-form-body">
            {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

            <div className="admin-form-header">
              <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <div className="admin-input-group">
                <Form.Label>Gambar Slide <span className="text-danger">*</span></Form.Label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="admin-input" />
                  {uploading && <Spinner animation="border" size="sm" variant="success" />}
                </div>
                {form.imageUrl && !uploading && <Image src={form.imageUrl} thumbnail style={{ maxHeight: 120 }} className="mt-1" />}
                <Form.Control type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
              </div>

              <div className="admin-input-group">
                <Form.Label>Teks Caption <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="caption" value={form.caption} onChange={handleChange} placeholder="Selamat Datang..." required className="admin-input" />
              </div>

              <div className="admin-input-group">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control type="text" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Website resmi Padukuhan Kedung..." className="admin-input" />
              </div>

              <div className="d-flex gap-2">
              <Button className="admin-btn-primary" type="submit" disabled={loading || uploading}>
                  {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Slide'}
                </Button>
                <Button className="admin-btn-secondary" onClick={() => navigate('/admin')}>Batal</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default CarouselForm
