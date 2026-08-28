import { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaEnvelope, FaInstagram, FaTiktok, FaYoutube, FaPaperPlane, FaHome, FaExternalLinkAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import api from '../utils/api';
import SEO from '../components/SEO';
import ProfilHero from '../components/Profil/ProfilHero';
import KontakMap from '../components/KontakMap';

const PETA = {
  besar: 'https://www.google.com/maps?q=-7.8856475010263996,110.30198600000003'
};

const SOSMED = [
  { icon: FaInstagram, label: 'Instagram', url: 'https://www.instagram.com/opik.1965/', color: '#E4405F' },
  { icon: FaTiktok, label: 'TikTok', url: 'https://www.tiktok.com/@pemuda.pemudi.ked', color: '#000000' },
  { icon: FaYoutube, label: 'YouTube', url: 'https://www.youtube.com/@PemudaPemudiKedung', color: '#FF0000' },
];

const INFO = [
  { icon: FaHome, label: 'Alamat', text: 'Kedung, Guwosari, Kec. Pajangan, Kab. Bantul, DIY' },
  { icon: FaEnvelope, label: 'Email', text: 'padukuhankedung@gmail.com', href: 'mailto:padukuhankedung@gmail.com' },
  { icon: FaPhoneAlt, label: 'Telepon', text: '+62 812-3456-7890', href: 'tel:+6281234567890' },
  { icon: FaClock, label: 'Jam Layanan', text: 'Senin – Jumat, 08.00 – 15.00 WIB' },
];

function KontakPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      await api.publicCreateMessage(payload);
      Swal.fire({ icon: 'success', title: 'Pesan Terkirim!', text: 'Terima kasih, pesan Anda akan kami tindak lanjuti.', timer: 3000, showConfirmButton: false });
      setForm({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
    } catch {
      setError('Gagal mengirim pesan. Silakan coba lagi.');
    }
    setLoading(false);
  };

  return (
    <main className="profil-page kontak-page">
      <SEO title="Kontak" description="Hubungi Padukuhan Kedung, Kalurahan Guwosari, Pajangan, Bantul. Kirim pesan, saran, atau pertanyaan melalui form kontak." />
      <ProfilHero title="Hubungi Kami" subtitle="Sampaikan pesan, saran, atau pertanyaan Anda" />

      <Container className="py-4 py-lg-5">
        <Row className="g-4 g-lg-5">

          {/* ==== Kolom Info Kontak ==== */}
          <Col lg={5} data-aos="fade-up">
            <div className="kontak-info-column">
              <div className="public-form-header kontak-info-header">
                <div className="public-form-icon">
                  <FaHome />
                </div>
                <div>
                  <h5>Informasi Kontak</h5>
                  <p>Media resmi untuk menghubungi kami</p>
                </div>
              </div>

              <div className="kontak-info-list">
                {INFO.map((item) => (
                  <div key={item.label} className="kontak-info-item">
                    <div className="kontak-info-icon">
                      <item.icon />
                    </div>
                    <div className="kontak-info-body">
                      <span className="kontak-info-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="kontak-info-text text-decoration-none">
                          {item.text}
                        </a>
                      ) : (
                        <span className="kontak-info-text">{item.text}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="kontak-map-wrap">
                <KontakMap />
                <a href={PETA.besar} target="_blank" rel="noopener noreferrer" className="kontak-map-link">
                  <FaExternalLinkAlt className="me-1" />Buka Peta Besar
                </a>
              </div>

              <div className="kontak-sosmed-block">
                <span className="kontak-info-label">Media Sosial</span>
                <div className="d-flex gap-2 mt-2">
                  {SOSMED.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="kontak-sosmed" style={{ '--sosmed-color': s.color }} title={s.label} aria-label={s.label}>
                      <s.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          <Col lg={7} data-aos="fade-up" data-aos-delay="100">
            <div className="public-form-card kontak-form-card">
              <div className="public-form-header kontak-form-header">
                <div className="public-form-icon public-form-icon-blue">
                  <FaPaperPlane />
                </div>
                <div>
                  <h5>Kirim Pesan</h5>
                  <p>Isi form di bawah ini, pesan akan kami terima dan tindak lanjuti.</p>
                </div>
              </div>

              {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="public-floating-group">
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder=" " required />
                      <label>Nama <span className="text-danger">*</span></label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="public-floating-group">
                      <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder=" " />
                      <label>No. WhatsApp / Telepon</label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="public-floating-group">
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder=" " required />
                      <label>Email <span className="text-danger">*</span></label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="public-floating-group">
                      <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder=" " required />
                      <label>Subjek <span className="text-danger">*</span></label>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="public-floating-group">
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder=" " required />
                      <label>Pesan <span className="text-danger">*</span></label>
                    </div>
                  </Col>
                </Row>

                <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <button type="submit" disabled={loading} className="public-form-btn kontak-form-btn">
                  {loading ? <Spinner animation="border" size="sm" className="me-1" /> : <FaPaperPlane className="me-1" />}
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default KontakPage;
