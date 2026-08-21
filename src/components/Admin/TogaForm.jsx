import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import uploadToImgBB from '../../utils/imageUpload'
import { FaPlus, FaTrash } from 'react-icons/fa'

function TogaForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    imgUrl: '',
    manfaat: [{ khasiat: '', cara: '' }],
    sumberInformasi: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const all = await api.getAllTogas()
          const item = all.find((s) => s.id === id)
          if (item) {
            setForm({
              name: item.name || '',
              imgUrl: item.imgUrl || '',
              manfaat: Array.isArray(item.manfaat) && item.manfaat.length > 0
                ? item.manfaat.map((m) => ({ khasiat: m.khasiat || '', cara: m.cara || '' }))
                : [{ khasiat: '', cara: '' }],
              sumberInformasi: item.sumberInformasi || ''
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

  const handleManfaatChange = (index, field, value) => {
    const updated = [...form.manfaat]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, manfaat: updated })
  }

  const addManfaat = () => {
    setForm({ ...form, manfaat: [...form.manfaat, { khasiat: '', cara: '' }] })
  }

  const removeManfaat = (index) => {
    const updated = form.manfaat.filter((_, i) => i !== index)
    setForm({ ...form, manfaat: updated.length > 0 ? updated : [{ khasiat: '', cara: '' }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = {
      ...form,
      manfaat: form.manfaat.filter((m) => m.khasiat.trim() || m.cara.trim())
    }
    try {
      if (isEdit) {
        await api.updateToga(id, payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createToga(payload)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ name: '', imgUrl: '', manfaat: [{ khasiat: '', cara: '' }], sumberInformasi: '' })
      }
    } catch {
      setError('Gagal menyimpan data')
    }
    setLoading(false)
  }

  if (fetching) {
    return (
      <AdminLayout title={isEdit ? 'Edit TOGA' : 'Tambah TOGA'}>
        <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="success" /></div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit TOGA' : 'Tambah TOGA'}>
      <Container className="pb-4" style={{ maxWidth: 600 }}>
        <Card className="admin-form-card">
          <Card.Body className="admin-form-body">
            {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

            <div className="admin-form-header">
              <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
            </div>

            <Form onSubmit={handleSubmit}>
              <div className="admin-input-group">
                <Form.Label>Nama Tanaman <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required className="admin-input" />
              </div>
              <div className="admin-input-group">
                <Form.Label>Gambar</Form.Label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="admin-input" />
                  {uploading && <Spinner animation="border" size="sm" variant="success" />}
                </div>
                {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 100 }} className="mt-1" />}
                <Form.Control type="text" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
              </div>

              <div className="admin-input-group">
                <Form.Label>Manfaat / Khasiat</Form.Label>
                {form.manfaat.map((m, index) => (
                  <div key={index} className="admin-manfaat-row mb-2 p-2 border rounded">
                    <Form.Control
                      type="text"
                      placeholder="Khasiat"
                      value={m.khasiat}
                      onChange={(e) => handleManfaatChange(index, 'khasiat', e.target.value)}
                      className="admin-input mb-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Cara Pengolahan"
                      value={m.cara}
                      onChange={(e) => handleManfaatChange(index, 'cara', e.target.value)}
                      className="admin-input"
                    />
                    <div className="d-flex justify-content-end mt-2">
                      <Button variant="none" size="sm" className="admin-action-btn admin-action-delete" onClick={() => removeManfaat(index)} title="Hapus baris">
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="none" size="sm" className="admin-btn-secondary mt-1" onClick={addManfaat}>
                  <FaPlus /> Tambah Manfaat
                </Button>
              </div>

              <div className="admin-input-group">
                <Form.Label>Sumber Informasi</Form.Label>
                <Form.Control type="text" name="sumberInformasi" value={form.sumberInformasi} onChange={handleChange} placeholder="https://..." className="admin-input" />
              </div>

              <div className="d-flex gap-2">
                <Button className="admin-btn-primary" type="submit" disabled={loading || uploading}>
                  {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
                </Button>
                <Button className="admin-btn-secondary" onClick={() => navigate('/admin/toga')}>Batal</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default TogaForm