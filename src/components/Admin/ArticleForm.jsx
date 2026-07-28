import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import config from '../../utils/config'

function ArticleForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    body: '',
    author: '',
    publishDate: '',
    imgUrl: '',
    additionalImgUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState({ img: false, additional: false })

  useEffect(() => {
    if (isEdit) {
      loadArticle()
    }
  }, [id])

  const loadArticle = async () => {
    try {
      const article = await api.getArticleDetail(id)
      setForm({
        title: article.title || '',
        body: article.body || '',
        author: article.author || '',
        publishDate: article.publishDate || '',
        imgUrl: article.imgUrl || '',
        additionalImgUrl: article.additionalImgUrl || ''
      })
    } catch {
      setError('Gagal memuat artikel')
    }
    setFetching(false)
  }

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
          if (data.success) {
            resolve(data.data.url)
          } else {
            reject(new Error(data.error?.message || 'Gagal upload'))
          }
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error('Gagal membaca file'))
    })
  }

  const handleUpload = async (file, field) => {
    if (!file) return
    const key = field === 'imgUrl' ? 'img' : 'additional'
    setUploading((prev) => ({ ...prev, [key]: true }))
    setError('')

    try {
      const url = await uploadToImgBB(file)
      setForm((prev) => ({ ...prev, [field]: url }))
    } catch {
      setError(`Gagal upload gambar. Coba lagi atau masukkan URL manual.`)
    }
    setUploading((prev) => ({ ...prev, [key]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isEdit) {
        await api.updateArticle(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Artikel berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createArticle(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Artikel berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
        setForm({ title: '', body: '', author: '', publishDate: '', imgUrl: '', additionalImgUrl: '' })
      }
    } catch {
      setError('Gagal menyimpan artikel')
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
    <AdminLayout title={isEdit ? 'Edit Artikel' : 'Tambah Artikel'}>
    <Container className="pb-4" style={{ maxWidth: 700 }}>
      <Card className="admin-form-card">
        <Card.Body className="admin-form-body">

          {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}

          <div className="admin-form-header">
            <h5>{isEdit ? 'Edit' : 'Tambah'} Data</h5>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <Form.Label>Judul <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>

            <div className="admin-input-group">
              <Form.Label>Penulis <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>

            <div className="admin-input-group">
              <Form.Label>Tanggal Publikasi <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="date"
                name="publishDate"
                value={form.publishDate}
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>

            <div className="admin-input-group">
              <Form.Label>Gambar Utama <span className="text-danger">*</span></Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e.target.files[0], 'imgUrl')}
                disabled={uploading.img}
                className="admin-input"
              />
                {uploading.img && (
                  <Spinner animation="border" size="sm" variant="success" />
                )}
              </div>
              {form.imgUrl && !uploading.img && (
                <div>
                  <Image src={form.imgUrl} thumbnail style={{ maxHeight: 120 }} className="mt-1" />
                  <Form.Text className="text-muted d-block">URL: {form.imgUrl}</Form.Text>
                </div>
              )}
              <Form.Control
                type="url"
                name="imgUrl"
                value={form.imgUrl}
                onChange={handleChange}
                placeholder="Atau masukkan URL manual"
                className="admin-input mt-2"
                required
              />
            </div>

            <div className="admin-input-group">
              <Form.Label>Gambar Tambahan (opsional)</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e.target.files[0], 'additionalImgUrl')}
                disabled={uploading.additional}
                className="admin-input"
              />
                {uploading.additional && (
                  <Spinner animation="border" size="sm" variant="success" />
                )}
              </div>
              {form.additionalImgUrl && !uploading.additional && (
                <div>
                  <Image src={form.additionalImgUrl} thumbnail style={{ maxHeight: 120 }} className="mt-1" />
                  <Form.Text className="text-muted d-block">URL: {form.additionalImgUrl}</Form.Text>
                </div>
              )}
              <Form.Control
                type="url"
                name="additionalImgUrl"
                value={form.additionalImgUrl}
                onChange={handleChange}
                placeholder="Atau masukkan URL manual"
                className="admin-input mt-2"
              />
            </div>

            <div className="admin-input-group">
              <Form.Label>
                Isi Artikel <span className="text-danger">*</span>
                <small className="text-muted ms-2">
                  (pisahkan paragraf dengan 2 spasi lalu enter)
                </small>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                name="body"
                value={form.body}
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>

            <div className="d-flex gap-2">
              <Button
                className="admin-btn-primary"
                type="submit"
                disabled={loading || uploading.img || uploading.additional}
              >
                {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Artikel'}
              </Button>
              <Button className="admin-btn-secondary" onClick={() => navigate('/admin')}>
                Batal
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </AdminLayout>
  )
}

export default ArticleForm
