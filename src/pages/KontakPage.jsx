import { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaEnvelope, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaPaperPlane, FaHome, FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa';
import api from '../utils/api';
import SEO from '../components/SEO';
import ProfilHero from '../components/Profil/ProfilHero';

const PETA = {
  embed: 'https://www.google.com/maps?q=-7.8856475010263996,110.30198600000003&z=17&output=embed',
  besar: 'https://www.google.com/maps?q=-7.8856475010263996,110.30198600000003'
};

const SOSMED = [
  { icon: FaInstagram, label: 'Instagram', url: 'https://www.instagram.com/opik.1965/' },
  { icon: FaTiktok, label: 'TikTok', url: 'https://www.tiktok.com/@pemuda.pemudi.ked' },
  { icon: FaYoutube, label: 'YouTube', url: 'https://www.youtube.com/@PemudaPemudiKedung' },
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
    <main className="profil-page">
      <SEO title="Kontak" description="Hubungi Padukuhan Kedung, Kalurahan Guwosari, Pajangan, Bantul. Kirim pesan, saran, atau pertanyaan melalui form kontak." />
      <ProfilHero title="Hubungi Kami" subtitle="Sampaikan pesan, saran, atau pertanyaan Anda" />
      <Container className="py-4">
        <Row className="g-4">
          <Col lg={4} data-aos="fade-up">
            <div className="public-form-card">
              <div className="public-form-header">
                <div className="public-form-icon">
                  <FaHome />
                </div>
                <div>
                  <h5>Informasi Kontak</h5>
                  <p>Media resmi untuk menghubungi kami</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="kontak-icon"><FaHome /></div>
                <div>
                  <span className="fw-semibold d-block">Alamat</span>
                  <span className="text-muted small">Kedung, Guwosari, Kec. Pajangan, Kab. Bantul, DIY</span>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="kontak-icon"><FaEnvelope /></div>
                <div>
                  <span className="fw-semibold d-block">Email</span>
                  <a href="mailto:padukuhankedung@gmail.com" className="text-muted small text-decoration-none">padukuhankedung@gmail.com</a>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="kontak-icon"><FaMapMarkerAlt /></div>
                <div>
                  <span className="fw-semibold d-block">Peta Utama</span>
                  <div className="mt-2">
                    <iframe
                      src={PETA.embed}
                      title="Peta Padukuhan Kedung"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      className="kontak-map"
                    />
                    <a href={PETA.besar} target="_blank" rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-success rounded-pill mt-2">
                      <FaExternalLinkAlt className="me-1" />Buka Peta Besar
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="kontak-icon"><FaShareAlt /></div>
                <div>
                  <span className="fw-semibold d-block">Media Sosial</span>
                  <div className="d-flex gap-2 mt-1">
                    {SOSMED.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="kontak-sosmed" title={s.label} aria-label={s.label}>
                        <s.icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={8} data-aos="fade-up" data-aos-delay="100">
            <div className="public-form-card">
              <div className="public-form-header">
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
                <div className="public-floating-group">
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder=" " required />
                  <label>Nama <span className="text-danger">*</span></label>
                </div>
                <div className="public-floating-group">
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder=" " />
                  <label>No. WhatsApp / Telepon</label>
                </div>
                <div className="public-floating-group">
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder=" " required />
                  <label>Email <span className="text-danger">*</span></label>
                </div>
                <div className="public-floating-group">
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder=" " required />
                  <label>Subjek <span className="text-danger">*</span></label>
                </div>
                <div className="public-floating-group">
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder=" " required />
                  <label>Pesan <span className="text-danger">*</span></label>
                </div>

                <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                  <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <button type="submit" disabled={loading} className="public-form-btn">
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
