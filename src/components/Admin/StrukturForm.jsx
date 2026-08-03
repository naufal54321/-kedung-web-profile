import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'

function StrukturForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    job: '',
    contact: '',
    imgUrl: '',
    isHead: false
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const all = await api.getAllStrukturs()
          const item = all.find((s) => s.id === id)
          if (item) {
            setForm({
              name: item.name || '',
              job: item.job || '',
              contact: item.contact || '',
              imgUrl: item.imgUrl || '',
              isHead: item.isHead || false
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
  }, [id, isEdit])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadToImgBB(file)
      setForm((prev) => ({ ...prev, imgUrl: url }))
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
        await api.updateStruktur(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createStruktur(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ name: '', job: '', contact: '', imgUrl: '', isHead: false })
      }
    } catch {
      setError('Gagal menyimpan data')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <AdminLayout title={isEdit ? 'Edit Struktur' : 'Tambah Struktur'}>
        <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="success" /></div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Struktur' : 'Tambah Struktur'}>
      <Container className="pb-4" style={{ maxWidth: 600 }}>
        <Card className="admin-form-card">
          <Card.Body className="admin-form-body">
            {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

            <div className="admin-form-header">
              <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={8}>
                  <div className="admin-input-group">
                    <Form.Label>Nama <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
                  </div>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                  <Form.Check type="checkbox" label="Kepala Dusun" name="isHead" checked={form.isHead} onChange={handleChange} className="mt-3" />
                </Col>
              </Row>
              <div className="admin-input-group">
                <Form.Label>Jabatan <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="job" value={form.job} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="admin-input-group">
                <Form.Label>Kontak</Form.Label>
                <Form.Control type="text" name="contact" value={form.contact} onChange={handleChange} className="admin-input" />
              </div>
              <div className="admin-input-group">
                <Form.Label>Foto</Form.Label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="admin-input" />
                  {uploading && <Spinner animation="border" size="sm" variant="success" />}
                </div>
                {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 100 }} className="mt-1" />}
                <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
              </div>
              <div className="d-flex gap-2">
              <Button className="admin-btn-primary" type="submit" disabled={loading || uploading}>
                  {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
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

export default StrukturForm
