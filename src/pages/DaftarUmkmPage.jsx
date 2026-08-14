import { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaStore } from 'react-icons/fa';
import api from '../utils/api';
import uploadToImgBB from '../utils/imageUpload';
import SEO from '../components/SEO';

function DaftarUmkmPage() {
  const [form, setForm] = useState({
    name: '',
    owner: '',
    category: '',
    price: '',
    contact: '',
    description: '',
    imgUrl: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({ ...prev, imgUrl: url }));
    } catch {
      setError('Gagal upload gambar, coba masukkan URL manual');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.website) {
      return;
    }
    setLoading(true);

    try {
      const payload = { ...form };
      delete payload.website;
      await api.publicCreateUmkm(payload);
      Swal.fire({ icon: 'success', title: 'Terdaftar!', text: 'UMKM berhasil didaftarkan! Data akan ditinjau oleh admin.', timer: 3000, showConfirmButton: false })
      setForm({ name: '', owner: '', category: '', price: '', contact: '', description: '', imgUrl: '', website: '' });
    } catch {
      setError('Gagal mendaftarkan UMKM. Silakan coba lagi.');
    }
    setLoading(false);
  };

  return (
    <div className="detail-page">
      <SEO title="Daftar UMKM" description="Daftarkan UMKM Anda di Padukuhan Kedung" />
      <Container className="py-4" style={{ maxWidth: 720 }}>
        <Link to="/Potensi-Dukuh" className="text-decoration-none text-muted d-inline-flex align-items-center gap-1 mb-3">
          <FaArrowLeft size={14} /> Kembali
        </Link>

        <div className="public-form-card" data-aos="fade-up">
          <div className="public-form-header">
            <div className="public-form-icon">
              <FaStore />
            </div>
            <div>
              <h5>Daftarkan UMKM</h5>
              <p>Isi form berikut untuk mendaftarkan usaha Anda di Padukuhan Kedung</p>
            </div>
          </div>

          {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className="public-floating-group">
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder=" " required />
                  <label>Nama UMKM <span className="text-danger">*</span></label>
                </div>
              </Col>
              <Col md={6}>
                <div className="public-floating-group">
                  <input type="text" name="owner" value={form.owner} onChange={handleChange} placeholder=" " required />
                  <label>Nama Pemilik <span className="text-danger">*</span></label>
                </div>
              </Col>
              <Col md={6}>
                <div className="public-floating-group">
                  <input type="text" name="category" value={form.category} onChange={handleChange} placeholder=" " required />
                  <label>Kategori <span className="text-danger">*</span></label>
                </div>
              </Col>
              <Col md={6}>
                <div className="public-floating-group">
                  <input type="text" name="price" value={form.price} onChange={handleChange} placeholder=" " />
                  <label>Harga</label>
                </div>
              </Col>
              <Col md={12}>
                <div className="public-floating-group">
                  <input type="text" name="contact" value={form.contact} onChange={handleChange} placeholder=" " required />
                  <label>Nomor WhatsApp <span className="text-danger">*</span></label>
                  <span className="public-field-hint">Digunakan pembeli untuk menghubungi Anda</span>
                </div>
              </Col>
              <Col md={12}>
                <div className="public-floating-group">
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder=" " />
                  <label>Deskripsi</label>
                </div>
              </Col>
              <Col md={12}>
                <Form.Group className="public-field">
                  <Form.Label>Foto Produk</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} className="public-file" />
                    {uploading && <Spinner animation="border" size="sm" variant="success" />}
                  </div>
                  {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 80 }} className="mt-1" />}
                  <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL gambar" className="mt-2 public-file" />
                </Form.Group>
              </Col>
            </Row>

            <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
              <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </div>

            <button type="submit" disabled={loading || uploading} className="public-form-btn mt-1">
              {loading ? 'Mendaftarkan...' : 'Daftarkan UMKM'}
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default DaftarUmkmPage;
