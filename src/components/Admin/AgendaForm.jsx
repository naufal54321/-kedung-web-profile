import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import config from '../../utils/config'

function AgendaForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    lokasi: '',
    maps: '',
    imgUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const all = await api.getAllAgendas()
          const item = all.find((a) => a.id === id)
          if (item) {
            setForm({
              name: item.name || '',
              description: item.description || '',
              dateStart: item.dateStart || '',
              dateEnd: item.dateEnd || '',
              lokasi: item.lokasi || '',
              maps: item.maps || '',
              imgUrl: item.imgUrl || ''
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
    setForm({ ...form, [e.target.name]: e.target.value })
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
        await api.updateAgenda(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Agenda berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createAgenda(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Agenda berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ name: '', description: '', dateStart: '', dateEnd: '', lokasi: '', maps: '', imgUrl: '' })
      }
    } catch {
      setError('Gagal menyimpan agenda')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <AdminLayout title={isEdit ? 'Edit Agenda' : 'Tambah Agenda'}>
        <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="success" /></div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Agenda' : 'Tambah Agenda'}>
      <Container className="pb-4" style={{ maxWidth: 700 }}>
        <Card className="admin-form-card">
          <Card.Body className="admin-form-body">
            {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

            <div className="admin-form-header">
              <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <div className="admin-input-group">
                <Form.Label>Nama Agenda <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
              </div>

              <div className="admin-input-group">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} className="admin-input" />
              </div>

              <Row>
                <Col md={6}>
                  <div className="admin-input-group">
                    <Form.Label>Tanggal Mulai <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="date" name="dateStart" value={form.dateStart} onChange={handleChange} required className="admin-input" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="admin-input-group">
                    <Form.Label>Tanggal Selesai <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="date" name="dateEnd" value={form.dateEnd} onChange={handleChange} required className="admin-input" />
                  </div>
                </Col>
              </Row>

              <div className="admin-input-group">
                <Form.Label>Lokasi</Form.Label>
                <Form.Control type="text" name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Balai Padukuhan Kedung" className="admin-input" />
              </div>

              <div className="admin-input-group">
                <Form.Label>URL Maps Embed</Form.Label>
                <Form.Control type="url" name="maps" value={form.maps} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." className="admin-input" />
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
                  {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Agenda'}
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

export default AgendaForm
