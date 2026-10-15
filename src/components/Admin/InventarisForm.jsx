import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'

function InventarisForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    namaBarang: '',
    jumlah: '',
    kondisi: 'baik',
    tanggalPerolehan: '',
    keterangan: '',
    rt: '',
    foto: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    const loadInventaris = async () => {
      try {
        const item = await api.getInventarisDetail(id)
        setForm({
          namaBarang: item.namaBarang || '',
          jumlah: item.jumlah || '',
          kondisi: item.kondisi || 'baik',
          tanggalPerolehan: item.tanggalPerolehan || '',
          keterangan: item.keterangan || '',
          rt: item.rt || '',
          foto: item.foto || ''
        })
      } catch {
        setError('Gagal memuat data inventaris')
      }
      setFetching(false)
    }
    loadInventaris()
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUploadFoto = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadToImgBB(file)
      setForm((prev) => ({ ...prev, foto: url }))
    } catch {
      setError('Gagal upload foto')
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...form,
      jumlah: parseInt(form.jumlah) || 0,
      createdAt: isEdit ? form.createdAt : new Date().toISOString()
    }

    try {
      if (isEdit) {
        await api.updateInventaris(id, payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data inventaris berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createInventaris(payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data inventaris berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ namaBarang: '', jumlah: '', kondisi: 'baik', tanggalPerolehan: '', keterangan: '', rt: '', foto: '' })
      }
    } catch {
      setError('Gagal menyimpan data inventaris')
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
    <AdminLayout title={isEdit ? 'Edit Inventaris RT' : 'Tambah Inventaris RT'}>
    <Container className="pb-4" style={{ maxWidth: 800 }}>
      <Card className="admin-form-card">
        <Card.Body className="admin-form-body">

          {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

          <div className="admin-form-header">
            <h5>{isEdit ? 'Edit' : 'Tambah'} Data Inventaris</h5>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <div className="admin-input-group">
                  <Form.Label>Nama Barang <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="namaBarang" value={form.namaBarang} onChange={handleChange} required className="admin-input" placeholder="Contoh: Meja Rapat" />
                </div>
              </Col>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>Jumlah <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="number" name="jumlah" value={form.jumlah} onChange={handleChange} required min="1" className="admin-input" placeholder="1" />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>RT <span className="text-danger">*</span></Form.Label>
                  <Form.Select name="rt" value={form.rt} onChange={handleChange} required className="admin-input">
                    <option value="">Pilih RT</option>
                    <option value="RT 01">RT 01</option>
                    <option value="RT 02">RT 02</option>
                    <option value="RT 03">RT 03</option>
                    <option value="RT 04">RT 04</option>
                    <option value="RT 05">RT 05</option>
                    <option value="RT 06">RT 06</option>
                  </Form.Select>
                </div>
              </Col>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Kondisi <span className="text-danger">*</span></Form.Label>
                  <Form.Select name="kondisi" value={form.kondisi} onChange={handleChange} required className="admin-input">
                    <option value="baik">Baik</option>
                    <option value="rusak_ringan">Rusak Ringan</option>
                    <option value="rusak_berat">Rusak Berat</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Tanggal Perolehan</Form.Label>
                  <Form.Control type="date" name="tanggalPerolehan" value={form.tanggalPerolehan} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Foto Barang</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadFoto(e.target.files[0])} disabled={uploading} className="admin-input" />
                    {uploading && <Spinner animation="border" size="sm" variant="success" />}
                  </div>
                  {form.foto && !uploading && (
                    <Image src={form.foto} thumbnail style={{ maxHeight: 100 }} className="mt-1" />
                  )}
                  <Form.Control type="url" name="foto" value={form.foto} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
                </div>
              </Col>
            </Row>

            <div className="admin-input-group">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control as="textarea" rows={3} name="keterangan" value={form.keterangan} onChange={handleChange} className="admin-input" placeholder="Keterangan tambahan..." />
            </div>

            <div className="d-flex gap-2 mt-4">
              <Button className="admin-btn-primary" type="submit" disabled={loading || uploading}>
                {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Inventaris'}
              </Button>
              <Button className="admin-btn-secondary" onClick={() => navigate('/admin/inventaris')}>Batal</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </AdminLayout>
  )
}

export default InventarisForm
