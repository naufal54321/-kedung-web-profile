import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function AgendaForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ name: '', description: '', dateStart: '', dateEnd: '', lokasi: '', maps: '', imgUrl: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ name: '', description: '', dateStart: '', dateEnd: '', lokasi: '', maps: '', imgUrl: '' })
    setError('')
    if (isEdit) {
      setFetching(true)
      const fetchData = async () => {
        try {
          const all = await api.getAllAgendas()
          const item = all.find((a) => a.id === id)
          if (item) setForm({ name: item.name || '', description: item.description || '', dateStart: item.dateStart || '', dateEnd: item.dateEnd || '', lokasi: item.lokasi || '', maps: item.maps || '', imgUrl: item.imgUrl || '' })
          else setError('Data tidak ditemukan')
        } catch { setError('Gagal memuat data') }
        setFetching(false)
      }
      fetchData()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

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
        await api.updateAgenda(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Agenda berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createAgenda(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Agenda berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch { setError('Gagal menyimpan agenda') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Agenda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-agenda">
            <Form.Group className="mb-3">
              <Form.Label>Nama Agenda <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} className="admin-input" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Mulai <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="date" name="dateStart" value={form.dateStart} onChange={handleChange} required className="admin-input" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Selesai <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="date" name="dateEnd" value={form.dateEnd} onChange={handleChange} required className="admin-input" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Lokasi</Form.Label>
              <Form.Control type="text" name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Balai Padukuhan Kedung" className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL Maps Embed</Form.Label>
              <Form.Control type="url" name="maps" value={form.maps} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gambar</Form.Label>
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
        <Button variant="success" type="submit" form="form-agenda" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Agenda'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AgendaForm
