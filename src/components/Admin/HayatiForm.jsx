import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'

function HayatiForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const location = useLocation()
  const isNonHayati = location.pathname.startsWith('/admin/nonhayati')
  const label = isNonHayati ? 'Sumber Daya Non Hayati' : 'Sumber Daya Hayati'

  const [form, setForm] = useState({ name: '', imgUrl: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const all = isNonHayati ? await api.getAllNonHayatis() : await api.getAllHayatis()
          const item = all.find((s) => s.id === id)
          if (item) {
            setForm({ name: item.name || '', imgUrl: item.imgUrl || '' })
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
  }, [id, isEdit, isNonHayati])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
        if (isNonHayati) {
          await api.updateNonHayati(id, form)
        } else {
          await api.updateHayati(id, form)
        }
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        if (isNonHayati) {
          await api.createNonHayati(form)
        } else {
          await api.createHayati(form)
        }
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ name: '', imgUrl: '' })
      }
    } catch {
      setError('Gagal menyimpan data')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <AdminLayout title={isEdit ? `Edit ${label}` : `Tambah ${label}`}>
        <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="success" /></div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? `Edit ${label}` : `Tambah ${label}`}>
      <Container className="pb-4" style={{ maxWidth: 600 }}>
        <Card className="admin-form-card">
          <Card.Body className="admin-form-body">
            {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

            <div className="admin-form-header">
              <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            </div>

            <Form onSubmit={handleSubmit}>
              <div className="admin-input-group">
                <Form.Label>Nama <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="admin-input-group">
                <Form.Label>Gambar</Form.Label>
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
                <Button className="admin-btn-secondary" onClick={() => navigate(isNonHayati ? '/admin/nonhayati' : '/admin/hayati')}>Batal</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default HayatiForm