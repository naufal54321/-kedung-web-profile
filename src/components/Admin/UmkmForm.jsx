import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image, Row, Col, Card } from 'react-bootstrap'
import { FaPlus, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function UmkmForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ name: '', owner: '', category: '', price: '', contact: '', description: '', imgUrl: '', address: '', lat: '', lng: '', gofood: '', shopeefood: '', grabfood: '', catalogue: {} })
  const [catalogueItems, setCatalogueItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ name: '', owner: '', category: '', price: '', contact: '', description: '', imgUrl: '', address: '', lat: '', lng: '', gofood: '', shopeefood: '', grabfood: '', catalogue: {} })
    setCatalogueItems([]); setError('')
    if (isEdit) {
      setFetching(true)
      const loadUmkm = async () => {
        try {
          const umkm = await api.getUmkmDetail(id)
          setForm({ name: umkm.name || '', owner: umkm.owner || '', category: umkm.category || '', price: umkm.price || '', contact: umkm.contact || '', description: umkm.description || '', imgUrl: umkm.imgUrl || '', address: umkm.address || '', lat: umkm.lat ?? '', lng: umkm.lng ?? '', gofood: umkm.gofood || '', shopeefood: umkm.shopeefood || '', grabfood: umkm.grabfood || '', catalogue: umkm.catalogue || {} })
          setCatalogueItems(Object.entries(umkm.catalogue ?? {}).map(([key, val]) => ({ key, ...val })))
        } catch { setError('Gagal memuat UMKM') }
        setFetching(false)
      }
      loadUmkm()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleUploadMainImage = async (file) => {
    if (!file) return
    setUploading(true); setError('')
    try { const url = await uploadToImgBB(file); setForm((prev) => ({ ...prev, imgUrl: url })) }
    catch { setError('Gagal upload gambar utama') }
    setUploading(false)
  }

  const handleUploadCatalogueImage = async (file, index) => {
    if (!file) return; setError('')
    try { const url = await uploadToImgBB(file); const items = [...catalogueItems]; items[index] = { ...items[index], imgUrl: url }; setCatalogueItems(items) }
    catch { setError('Gagal upload gambar katalog') }
  }

  const addCatalogueItem = () => setCatalogueItems([...catalogueItems, { key: Date.now().toString(), name: '', price: '', imgUrl: '' }])
  const removeCatalogueItem = (index) => setCatalogueItems(catalogueItems.filter((_, i) => i !== index))
  const handleCatalogueChange = (index, field, value) => { const items = [...catalogueItems]; items[index] = { ...items[index], [field]: value }; setCatalogueItems(items) }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const catalogue = {}
    catalogueItems.forEach((item) => { if (item.name) catalogue[item.key] = { name: item.name, price: item.price, imgUrl: item.imgUrl } })
    const payload = { ...form, catalogue }
    try {
      if (isEdit) {
        await api.updateUmkm(id, payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'UMKM berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createUmkm(payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'UMKM berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch { setError('Gagal menyimpan UMKM') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} UMKM</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-umkm">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama UMKM <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pemilik <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="owner" value={form.owner} onChange={handleChange} required className="admin-input" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control type="text" name="category" value={form.category} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control type="text" name="price" value={form.price} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Kontak</Form.Label>
                  <Form.Control type="text" name="contact" value={form.contact} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gambar Utama</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadMainImage(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 100 }} />}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat (URL Google Maps Embed)</Form.Label>
              <Form.Control type="url" name="address" value={form.address} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." className="admin-input" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control type="number" step="any" name="lat" value={form.lat} onChange={handleChange} placeholder="-7.8867" className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="number" step="any" name="lng" value={form.lng} onChange={handleChange} placeholder="110.3016" className="admin-input" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>GoFood URL</Form.Label>
                  <Form.Control type="url" name="gofood" value={form.gofood} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>ShopeeFood URL</Form.Label>
                  <Form.Control type="url" name="shopeefood" value={form.shopeefood} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>GrabFood URL</Form.Label>
                  <Form.Control type="url" name="grabfood" value={form.grabfood} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
            </Row>

            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold m-0" style={{ color: '#2C5F2D' }}>Katalog Produk</h6>
              <Button variant="outline-success" size="sm" onClick={addCatalogueItem}><FaPlus className="me-1" /> Tambah Item</Button>
            </div>
            {catalogueItems.map((item, index) => (
              <Card key={item.key} className="mb-2 p-2 bg-light">
                <Row>
                  <Col md={4}>
                    <Form.Control type="text" placeholder="Nama Produk" value={item.name} onChange={(e) => handleCatalogueChange(index, 'name', e.target.value)} className="admin-input mb-1" size="sm" />
                  </Col>
                  <Col md={3}>
                    <Form.Control type="text" placeholder="Harga" value={item.price} onChange={(e) => handleCatalogueChange(index, 'price', e.target.value)} className="admin-input mb-1" size="sm" />
                  </Col>
                  <Col md={4}>
                    <div className="d-flex align-items-center gap-1">
                      <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadCatalogueImage(e.target.files[0], index)} className="admin-input mb-1" size="sm" />
                      {item.imgUrl && <Image src={item.imgUrl} thumbnail style={{ maxHeight: 35 }} />}
                    </div>
                  </Col>
                  <Col md={1} className="d-flex align-items-center">
                    <Button variant="outline-danger" size="sm" onClick={() => removeCatalogueItem(index)}><FaTrash /></Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-umkm" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah UMKM'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UmkmForm
