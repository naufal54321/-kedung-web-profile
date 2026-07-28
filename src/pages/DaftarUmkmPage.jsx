import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaStore } from 'react-icons/fa';
import api from '../utils/api';
import config from '../utils/config';

function DaftarUmkmPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    owner: '',
    category: '',
    price: '',
    contact: '',
    description: '',
    imgUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadToImgBB = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        try {
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${config.IMGBB_API_KEY}`, {
            method: 'POST',
            body: new URLSearchParams({ image: base64 })
          });
          const data = await res.json();
          if (data.success) resolve(data.data.url);
          else reject(new Error(data.error?.message || 'Gagal upload'));
        } catch (err) { reject(err); }
      };
      reader.onerror = () => reject(new Error('Gagal membaca file'));
    });
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
    setLoading(true);

    try {
      await api.publicCreateUmkm(form);
      Swal.fire({ icon: 'success', title: 'Terdaftar!', text: 'UMKM berhasil didaftarkan! Data akan ditinjau oleh admin.', timer: 3000, showConfirmButton: false })
      setForm({ name: '', owner: '', category: '', price: '', contact: '', description: '', imgUrl: '' });
    } catch {
      setError('Gagal mendaftarkan UMKM. Silakan coba lagi.');
    }
    setLoading(false);
  };

  return (
    <div className="detail-page">
      <Container className="py-4" style={{ maxWidth: 650 }}>
        <Link to="/Potensi-Dukuh" className="text-decoration-none text-muted d-inline-flex align-items-center gap-1 mb-3">
          <FaArrowLeft size={14} /> Kembali
        </Link>

        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <FaStore size={40} className="text-success mb-2" />
              <h4 className="fw-bold" style={{ color: '#1a4d1a' }}>Daftarkan UMKM</h4>
              <p className="text-muted small">Isi form berikut untuk mendaftarkan usaha Anda di Padukuhan Kedung</p>
            </div>

            {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama UMKM <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nama Pemilik <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="owner" value={form.owner} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Kategori <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="category" value={form.category} onChange={handleChange} placeholder="Makanan, Kerajinan, Hasil Tani, dll" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control type="text" name="price" value={form.price} onChange={handleChange} placeholder="Rp 15.000" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nomor WhatsApp <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="0812-3456-7890" required />
                  <Form.Text className="text-muted">Digunakan pembeli untuk menghubungi Anda</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Foto Produk</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} />
                    {uploading && <Spinner animation="border" size="sm" variant="success" />}
                  </div>
                  {form.imgUrl && !uploading && <Image src={form.imgUrl} thumbnail style={{ maxHeight: 80 }} className="mt-1" />}
                  <Form.Control type="url" name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="Atau masukkan URL gambar" className="mt-2" />
                </Form.Group>

                <Button variant="success" type="submit" disabled={loading || uploading} className="w-100 py-2"
                  style={{ backgroundColor: '#2C5F2D', borderColor: '#2C5F2D' }}>
                  {loading ? 'Mendaftarkan...' : 'Daftarkan UMKM'}
                </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DaftarUmkmPage;
