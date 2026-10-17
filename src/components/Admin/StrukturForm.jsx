import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function StrukturForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ name: '', job: '', contact: '', imgUrl: '', isHead: false })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ name: '', job: '', contact: '', imgUrl: '', isHead: false })
    setError('')
    if (isEdit) {
      setFetching(true)
      const fetchData = async () => {
        try {
          const all = await api.getAllStrukturs()
          const item = all.find((s) => s.id === id)
          if (item) setForm({ name: item.name || '', job: item.job || '', contact: item.contact || '', imgUrl: item.imgUrl || '', isHead: item.isHead || false })
          else setError('Data tidak ditemukan')
        } catch { setError('Gagal memuat data') }
        setFetching(false)
      }
      fetchData()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true); setError('')
    try { const url = await uploadToImgBB(file); setForm((prev) => ({ ...prev, imgUrl: url })) }
    catch { setError('Gagal upload gambar') }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (isEdit) {
        await api.updateStruktur(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createStruktur(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch { setError('Gagal menyimpan data') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Struktur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-struktur">
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <Form.Check type="checkbox" label="Kepala Dusun" name="isHead" checked={form.isHead} onChange={handleChange} className="mt-3" />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Jabatan <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="job" value={form.job} onChange={handleChange} required className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kontak</Form.Label>
              <Form.Control type="text" name="contact" value={form.contact} onChange={handleChange} className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Foto</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 100 }} />}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-struktur" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default StrukturForm
