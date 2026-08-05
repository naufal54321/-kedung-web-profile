import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaEnvelope, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaPaperPlane, FaHome } from 'react-icons/fa';
import api from '../utils/api';
import SEO from '../components/SEO';
import ProfilHero from '../components/Profil/ProfilHero';

const WILAYAH = [
  { label: 'Kedung 1', url: 'https://www.google.com/maps/d/u/0/viewer?mid=1nUZNsSP7ro-jZAqgE3r74K75KtguF_M&femb=1&ll=-7.8856475010263996%2C110.30198600000003&z=18' },
  { label: 'Kedung 2', url: 'https://goo.gl/maps/XGsiEp7XweDXoQ798' },
  { label: 'Kedung 3', url: 'https://goo.gl/maps/fYdcp1VFtasSd2Tx7' },
  { label: 'Kedung 4', url: 'https://www.google.com/maps/d/u/0/viewer?mid=1XR0hTRQRcfa8iykCK_ph-d9ospuOuIM' },
  { label: 'Kedung 5', url: 'https://goo.gl/maps/o4v7MAnQfYHzKgRu8' },
  { label: 'Kedung 6', url: 'https://goo.gl/maps/t4em7VVUNS6bCaJr6' },
];

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
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3" style={{ color: '#1a4d1a' }}>Informasi Kontak</h5>
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
                    <a href="mailto:Padukuhankedung@gmail.com" className="text-muted small text-decoration-none">Padukuhankedung@gmail.com</a>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="kontak-icon"><FaMapMarkerAlt /></div>
                  <div>
                    <span className="fw-semibold d-block">Peta Wilayah</span>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {WILAYAH.map((w) => (
                        <a key={w.label} href={w.url} target="_blank" rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-success rounded-pill px-2 py-0" style={{ fontSize: '0.72rem' }}>
                          {w.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="kontak-icon"><FaInstagram /></div>
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
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8} data-aos="fade-up" data-aos-delay="100">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-1" style={{ color: '#1a4d1a' }}>Kirim Pesan</h5>
                <p className="text-muted small mb-4">Isi form di bawah ini, pesan akan kami terima dan tindak lanjuti.</p>

                {error && <Alert variant="danger" role="alert" className="py-2">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nama <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>No. WhatsApp / Telepon</Form.Label>
                        <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="0812-3456-7890" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Subjek <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" name="subject" value={form.subject} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Pesan <span className="text-danger">*</span></Form.Label>
                    <Form.Control as="textarea" rows={5} name="message" value={form.message} onChange={handleChange} required />
                  </Form.Group>

                  <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                    <Form.Control type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  <Button variant="success" type="submit" disabled={loading}
                    className="w-100 py-2" style={{ backgroundColor: '#2C5F2D', borderColor: '#2C5F2D' }}>
                    {loading ? <Spinner animation="border" size="sm" className="me-1" /> : <FaPaperPlane className="me-2" />}
                    {loading ? 'Mengirim...' : 'Kirim Pesan'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default KontakPage;
