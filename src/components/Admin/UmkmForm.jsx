import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import { FaPlus, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'

function UmkmForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    owner: '',
    category: '',
    price: '',
    contact: '',
    description: '',
    imgUrl: '',
    address: '',
    lat: '',
    lng: '',
    gofood: '',
    shopeefood: '',
    grabfood: '',
    catalogue: {}
  })
  const [catalogueItems, setCatalogueItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    const loadUmkm = async () => {
      try {
        const umkm = await api.getUmkmDetail(id)
        setForm({
          name: umkm.name || '',
          owner: umkm.owner || '',
          category: umkm.category || '',
          price: umkm.price || '',
          contact: umkm.contact || '',
          description: umkm.description || '',
          imgUrl: umkm.imgUrl || '',
          address: umkm.address || '',
          lat: umkm.lat ?? '',
          lng: umkm.lng ?? '',
          gofood: umkm.gofood || '',
          shopeefood: umkm.shopeefood || '',
          grabfood: umkm.grabfood || '',
          catalogue: umkm.catalogue || {}
        })
        setCatalogueItems(
          Object.entries(umkm.catalogue ?? {}).map(([key, val]) => ({ key, ...val }))
        )
      } catch {
        setError('Gagal memuat UMKM')
      }
      setFetching(false)
    }
    loadUmkm()
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUploadMainImage = async (file) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadToImgBB(file)
      setForm((prev) => ({ ...prev, imgUrl: url }))
    } catch {
      setError('Gagal upload gambar utama')
    }
    setUploading(false)
  }

  const handleUploadCatalogueImage = async (file, index) => {
    if (!file) return
    setError('')
    try {
      const url = await uploadToImgBB(file)
      const items = [...catalogueItems]
      items[index] = { ...items[index], imgUrl: url }
      setCatalogueItems(items)
    } catch {
      setError('Gagal upload gambar katalog')
    }
  }

  const addCatalogueItem = () => {
    setCatalogueItems([...catalogueItems, { key: Date.now().toString(), name: '', price: '', imgUrl: '' }])
  }

  const removeCatalogueItem = (index) => {
    setCatalogueItems(catalogueItems.filter((_, i) => i !== index))
  }

  const handleCatalogueChange = (index, field, value) => {
    const items = [...catalogueItems]
    items[index] = { ...items[index], [field]: value }
    setCatalogueItems(items)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const catalogue = {}
    catalogueItems.forEach((item) => {
      if (item.name) {
        catalogue[item.key] = { name: item.name, price: item.price, imgUrl: item.imgUrl }
      }
    })

    const payload = { ...form, catalogue }

    try {
      if (isEdit) {
        await api.updateUmkm(id, payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'UMKM berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createUmkm(payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'UMKM berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ name: '', owner: '', category: '', price: '', contact: '', description: '', imgUrl: '', address: '', lat: '', lng: '', gofood: '', shopeefood: '', grabfood: '', catalogue: {} })
        setCatalogueItems([])
      }
    } catch {
      setError('Gagal menyimpan UMKM')
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
    <AdminLayout title={isEdit ? 'Edit UMKM' : 'Tambah UMKM'}>
    <Container className="pb-4" style={{ maxWidth: 800 }}>
      <Card className="admin-form-card">
        <Card.Body className="admin-form-body">

          {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

          <div className="admin-form-header">
            <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Nama UMKM <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
                </div>
              </Col>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Pemilik <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="owner" value={form.owner} onChange={handleChange} required className="admin-input" />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control type="text" name="category" value={form.category} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control type="text" name="price" value={form.price} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>Kontak</Form.Label>
                  <Form.Control type="text" name="contact" value={form.contact} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
            </Row>

            <div className="admin-input-group">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} className="admin-input" />
            </div>

            <div className="admin-input-group">
              <Form.Label>Gambar Utama</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadMainImage(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading && (
                <div>
                  <Image src={form.imgUrl} thumbnail style={{ maxHeight: 100 }} className="mt-1" />
                </div>
              )}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
            </div>

            <div className="admin-input-group">
              <Form.Label>Alamat (URL Google Maps Embed)</Form.Label>
              <Form.Control type="url" name="address" value={form.address} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." className="admin-input" />
            </div>

            <Row>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Latitude (opsional, untuk peta)</Form.Label>
                  <Form.Control type="number" step="any" name="lat" value={form.lat} onChange={handleChange} placeholder="-7.8867" className="admin-input" />
                </div>
              </Col>
              <Col md={6}>
                <div className="admin-input-group">
                  <Form.Label>Longitude (opsional, untuk peta)</Form.Label>
                  <Form.Control type="number" step="any" name="lng" value={form.lng} onChange={handleChange} placeholder="110.3016" className="admin-input" />
                </div>
              </Col>
            </Row>
            <Form.Text className="text-muted">
              Cara ambil koordinat: buka <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps</a>, klik kanan pada lokasi usaha, lalu salin angka latitude dan longitude dari kotak yang muncul.
            </Form.Text>

            <Row>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>GoFood URL</Form.Label>
                  <Form.Control type="url" name="gofood" value={form.gofood} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>ShopeeFood URL</Form.Label>
                  <Form.Control type="url" name="shopeefood" value={form.shopeefood} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
              <Col md={4}>
                <div className="admin-input-group">
                  <Form.Label>GrabFood URL</Form.Label>
                  <Form.Control type="url" name="grabfood" value={form.grabfood} onChange={handleChange} className="admin-input" />
                </div>
              </Col>
            </Row>

            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0" style={{ color: '#2C5F2D' }}>Katalog Produk</h5>
              <Button variant="outline-success" size="sm" onClick={addCatalogueItem}>
                <FaPlus className="me-1" /> Tambah Item
              </Button>
            </div>

            {catalogueItems.map((item, index) => (
              <Card key={item.key} className="mb-3 p-3 bg-light">
                <Row>
                  <Col md={4}>
                    <div className="admin-input-group">
                      <Form.Label>Nama Produk</Form.Label>
                      <Form.Control type="text" value={item.name} onChange={(e) => handleCatalogueChange(index, 'name', e.target.value)} className="admin-input" />
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="admin-input-group">
                      <Form.Label>Harga</Form.Label>
                      <Form.Control type="text" value={item.price} onChange={(e) => handleCatalogueChange(index, 'price', e.target.value)} className="admin-input" />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="admin-input-group">
                      <Form.Label>Gambar</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadCatalogueImage(e.target.files[0], index)} className="admin-input" />
                      </div>
                      {item.imgUrl && <Image src={item.imgUrl} thumbnail style={{ maxHeight: 50 }} className="mt-1" />}
                      <Form.Control type="url" value={item.imgUrl} onChange={(e) => handleCatalogueChange(index, 'imgUrl', e.target.value)} placeholder="URL" className="admin-input mt-1" size="sm" />
                    </div>
                  </Col>
                  <Col md={1} className="d-flex align-items-end">
                    <Button variant="outline-danger" size="sm" onClick={() => removeCatalogueItem(index)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}

            <div className="d-flex gap-2 mt-4">
              <Button className="admin-btn-primary" type="submit" disabled={loading || uploading}>
                {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah UMKM'}
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

export default UmkmForm
