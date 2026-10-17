import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function InventarisForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ namaBarang: '', jumlah: '', hargaSewa: '', kondisi: 'baik', tanggalPerolehan: '', keterangan: '', pemilik: '', lokasiPenyimpanan: '', foto: '' })
  const [existingData, setExistingData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ namaBarang: '', jumlah: '', hargaSewa: '', kondisi: 'baik', tanggalPerolehan: '', keterangan: '', pemilik: '', lokasiPenyimpanan: '', foto: '' })
    setExistingData(null); setError('')
    if (isEdit) {
      setFetching(true)
      const loadInventaris = async () => {
        try {
          const item = await api.getInventarisDetail(id)
          setExistingData(item)
          setForm({ namaBarang: item.namaBarang || '', jumlah: item.jumlah || '', hargaSewa: item.hargaSewa || '', kondisi: item.kondisi || 'baik', tanggalPerolehan: item.tanggalPerolehan || '', keterangan: item.keterangan || '', pemilik: item.pemilik || '', lokasiPenyimpanan: item.lokasiPenyimpanan || '', foto: item.foto || '' })
        } catch { setError('Gagal memuat data inventaris') }
        setFetching(false)
      }
      loadInventaris()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleUploadFoto = async (file) => {
    if (!file) return
    setUploading(true); setError('')
    try { const url = await uploadToImgBB(file); setForm((prev) => ({ ...prev, foto: url })) }
    catch { setError('Gagal upload foto') }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const payload = {
      ...form, jumlah: parseInt(form.jumlah) || 0, hargaSewa: parseInt(form.hargaSewa) || 0,
      statusPinjam: isEdit ? (existingData?.statusPinjam || 'tidak_dipinjam') : 'tidak_dipinjam',
      createdAt: isEdit ? (existingData?.createdAt || form.createdAt) : new Date().toISOString(),
      sewaAktif: isEdit ? (existingData?.sewaAktif || null) : null,
      riwayatSewa: isEdit ? (existingData?.riwayatSewa || []) : [],
      jumlahDisewa: isEdit ? (existingData?.jumlahDisewa || 0) : 0
    }
    try {
      if (isEdit) {
        await api.updateInventaris(id, payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data inventaris berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createInventaris(payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data inventaris berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch (err) { setError('Gagal menyimpan: ' + (err?.message || 'Unknown error')) }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Inventaris</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-inventaris">
            <div className="mb-2 fw-bold text-success small text-uppercase" style={{ letterSpacing: '0.5px' }}>Informasi Barang</div>
            <hr className="mt-0 mb-3" />
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Barang <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="namaBarang" value={form.namaBarang} onChange={handleChange} required className="admin-input" placeholder="Contoh: Meja Rapat" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Jumlah <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="number" name="jumlah" value={form.jumlah} onChange={handleChange} required min="1" className="admin-input" placeholder="1" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Pemilik <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="pemilik" value={form.pemilik} onChange={handleChange} required className="admin-input" placeholder="RT 01, Karang Taruna" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Harga Sewa (Rp/unit)</Form.Label>
                  <Form.Control type="number" name="hargaSewa" value={form.hargaSewa} onChange={handleChange} min="0" className="admin-input" placeholder="50000" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Kondisi <span className="text-danger">*</span></Form.Label>
                  <Form.Select name="kondisi" value={form.kondisi} onChange={handleChange} required className="admin-input">
                    <option value="baik">Baik</option>
                    <option value="rusak_ringan">Rusak Ringan</option>
                    <option value="rusak_berat">Rusak Berat</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Lokasi Penyimpanan</Form.Label>
              <Form.Control type="text" name="lokasiPenyimpanan" value={form.lokasiPenyimpanan} onChange={handleChange} className="admin-input" placeholder="Balai RT, Rumah Dukuh, Gudang" />
            </Form.Group>

            <div className="mb-2 fw-bold text-success small text-uppercase mt-3" style={{ letterSpacing: '0.5px' }}>Dokumen & Foto</div>
            <hr className="mt-0 mb-3" />
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Perolehan</Form.Label>
                  <Form.Control type="date" name="tanggalPerolehan" value={form.tanggalPerolehan} onChange={handleChange} className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Foto Barang</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleUploadFoto(e.target.files[0])} disabled={uploading} className="admin-input" />
                    {uploading && <Spinner animation="border" size="sm" variant="success" />}
                  </div>
                  {form.foto && !uploading && <Image src={form.foto} thumbnail style={{ maxHeight: 100 }} />}
                  <Form.Control type="url" name="foto" value={form.foto} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control as="textarea" rows={3} name="keterangan" value={form.keterangan} onChange={handleChange} className="admin-input" placeholder="Keterangan tambahan..." />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-inventaris" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Inventaris'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InventarisForm
