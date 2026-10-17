import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'

function HayatiForm({ show, onHide, editId, onSuccess, isNonHayati = false }) {
  const id = editId
  const isEdit = Boolean(id)
  const label = isNonHayati ? 'Sumber Daya Non Hayati' : 'Sumber Daya Hayati'

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
          const all = isNonHayati ? await api.getAllNonHayatis() : await api.getAllHayatis()
          const item = all.find((s) => s.id === id)
          if (item) setForm({ name: item.name || '', imgUrl: item.imgUrl || '' })
          else setError('Data tidak ditemukan')
        } catch { setError('Gagal memuat data') }
        setFetching(false)
      }
      fetchData()
    }
  }, [show, id, isEdit, isNonHayati])

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
        if (isNonHayati) await api.updateNonHayati(id, form)
        else await api.updateHayati(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        if (isNonHayati) await api.createNonHayati(form)
        else await api.createHayati(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch (err) { setError(err?.message || 'Gagal menyimpan data') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} {label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-hayati">
            <Form.Group className="mb-3">
              <Form.Label>Nama <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
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
        <Button variant="success" type="submit" form="form-hayati" disabled={loading || uploading || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HayatiForm
