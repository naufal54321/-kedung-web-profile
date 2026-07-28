import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import config from '../../utils/config'

function CarouselForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    imageUrl: '',
    caption: '',
    subtitle: '',
    sortOrder: 1
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
              sortOrder: item.sortOrder || 1
            })
          } else {
            setError('Data tidak ditemukan')
          }
        } catch {
          setError('Gagal memuat data')
        }
        setFetching(false)
      }
      fetchData()
    }
  }, [id])

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const uploadToImgBB = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1]
        try {
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${config.IMGBB_API_KEY}`, {
            method: 'POST',
            body: new URLSearchParams({ image: base64 })
          })
          const data = await res.json()
          if (data.success) resolve(data.data.url)
          else reject(new Error(data.error?.message || 'Gagal upload'))
        } catch (err) { reject(err) }
      }
      reader.onerror = () => reject(new Error('Gagal membaca file'))
    })
  }

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadToImgBB(file)
      setForm((prev) => ({ ...prev, imageUrl: url }))
    } catch {
      setError('Gagal upload gambar')
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
        await api.createCarousel(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Slide berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ imageUrl: '', caption: '', subtitle: '', sortOrder: 1 })
      }
    } catch {
      setError('Gagal menyimpan slide')
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

              <div className="admin-input-group">
                  <Form.Label>Urutan</Form.Label>
                <Form.Control type="number" name="sortOrder" value={form.sortOrder} onChange={handleChange} min={1} className="admin-input" />
                <Form.Text className="text-muted">Nomor urut slide (1, 2, 3...)</Form.Text>
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
