import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function LembagaForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ name: '', imgUrl: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!show) return
    setForm({ name: '', imgUrl: '' })
    setError('')
    if (isEdit) {
      setFetching(true)
      const fetchData = async () => {
        try {
          const all = await api.getAllLembagas()
          const item = all.find((l) => l.id === id)
          if (item) setForm({ name: item.name || '', imgUrl: item.imgUrl || '' })
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
        await api.updateLembaga(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createLembaga(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch { setError('Gagal menyimpan data') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Lembaga</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-lembaga">
            <Form.Group className="mb-3">
              <Form.Label>Nama Lembaga <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="name" value={form.name} onChange={handleChange} placeholder="Contoh: PKK, Pemuda-Pemudi, LPMK" required className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gambar Struktur</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="admin-input" />
                {uploading && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 120 }} />}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-lembaga" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LembagaForm
