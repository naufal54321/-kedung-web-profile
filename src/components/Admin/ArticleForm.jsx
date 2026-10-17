import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Modal, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import uploadToImgBB from '../../utils/imageUpload'
import { ARTICLE_CATEGORIES } from '../../utils/categories'

function ArticleForm({ show, onHide, editId, onSuccess }) {
  const id = editId
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ title: '', body: '', author: '', category: '', publishDate: '', imgUrl: '', additionalImgUrl: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState({ img: false, additional: false })

  useEffect(() => {
    if (!show) return
    setForm({ title: '', body: '', author: '', category: '', publishDate: '', imgUrl: '', additionalImgUrl: '' })
    setError('')
    if (isEdit) {
      setFetching(true)
      const loadArticle = async () => {
        try {
          const article = await api.getArticleDetail(id)
          setForm({ title: article.title || '', body: article.body || '', author: article.author || '', category: article.category || '', publishDate: article.publishDate || '', imgUrl: article.imgUrl || '', additionalImgUrl: article.additionalImgUrl || '' })
        } catch { setError('Gagal memuat artikel') }
        setFetching(false)
      }
      loadArticle()
    }
  }, [show, id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleUpload = async (file, field) => {
    if (!file) return
    const key = field === 'imgUrl' ? 'img' : 'additional'
    setUploading((prev) => ({ ...prev, [key]: true })); setError('')
    try { const url = await uploadToImgBB(file); setForm((prev) => ({ ...prev, [field]: url })) }
    catch { setError('Gagal upload gambar. Coba lagi atau masukkan URL manual.') }
    setUploading((prev) => ({ ...prev, [key]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (isEdit) {
        await api.updateArticle(id, form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Artikel berhasil diperbarui!', timer: 1500, showConfirmButton: false })
      } else {
        await api.createArticle(form)
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Artikel berhasil ditambahkan!', timer: 1500, showConfirmButton: false })
      }
      onSuccess?.(); onHide()
    } catch { setError('Gagal menyimpan artikel') }
    setLoading(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Tambah'} Artikel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {fetching ? (
          <div className="d-flex justify-content-center py-4"><Spinner animation="border" variant="success" /></div>
        ) : (
          <Form onSubmit={handleSubmit} id="form-article">
            <Form.Group className="mb-3">
              <Form.Label>Judul <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="title" value={form.title} onChange={handleChange} className="admin-input" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Penulis <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="author" value={form.author} onChange={handleChange} className="admin-input" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Select name="category" value={form.category} onChange={handleChange} className="admin-input">
                <option value="">Pilih Kategori (default: Berita)</option>
                {ARTICLE_CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Publikasi <span className="text-danger">*</span></Form.Label>
              <Form.Control type="date" name="publishDate" value={form.publishDate} onChange={handleChange} className="admin-input" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gambar Utama <span className="text-danger">*</span></Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0], 'imgUrl')} disabled={uploading.img} className="admin-input" />
                {uploading.img && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.imgUrl && !uploading.img && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 120 }} className="mt-1" />}
              <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gambar Tambahan (opsional)</Form.Label>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0], 'additionalImgUrl')} disabled={uploading.additional} className="admin-input" />
                {uploading.additional && <Spinner animation="border" size="sm" variant="success" />}
              </div>
              {form.additionalImgUrl && !uploading.additional && <Image src={form.additionalImgUrl} thumbnail style={{ maxHeight: 120 }} className="mt-1" />}
              <Form.Control type="url" name="additionalImgUrl" value={form.additionalImgUrl} onChange={handleChange} placeholder="Atau masukkan URL manual" className="admin-input mt-2" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Isi Artikel <span className="text-danger">*</span> <small className="text-muted">(pisahkan paragraf dengan 2 spasi lalu enter)</small></Form.Label>
              <Form.Control as="textarea" rows={10} name="body" value={form.body} onChange={handleChange} className="admin-input" required />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Batal</Button>
        <Button variant="success" type="submit" form="form-article" disabled={loading || uploading.img || uploading.additional || fetching}>
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Artikel'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ArticleForm
