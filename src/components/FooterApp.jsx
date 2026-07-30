import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTiktok, FaYoutube, FaEnvelope, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FooterApp() {
  return (
    <footer className="text-white" style={{ backgroundColor: '#1a4d1a' }}>
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <img src="/img/logo-bantul.png" alt="logo-bantul" loading="lazy" style={{ width: 45, height: 55, objectFit: 'contain' }} />
              <div>
                <h5 className="fw-bold mb-0">Padukuhan Kedung</h5>
                <small className="text-white-50">Website Resmi Padukuhan Kedung</small>
              </div>
            </div>
            <p className="text-white-50 small lh-lg">
              Website dusun dibangun dengan tujuan sebagai media pelayanan publik resmi dusun, yang dibangun dan dikelola oleh tim dusun setempat.
            </p>
          </Col>

          <Col md={2}>
            <h6 className="fw-bold mb-3">Jelajahi</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/Sejarah" className="text-white-50 text-decoration-none small">Sejarah</Link>
              <Link to="/Struktur-Pemerintahan" className="text-white-50 text-decoration-none small">Struktur</Link>
              <Link to="/Visi-Misi" className="text-white-50 text-decoration-none small">Visi & Misi</Link>
              <Link to="/Hayati-NonHayati" className="text-white-50 text-decoration-none small">Hayati & Non-Hayati</Link>
              <Link to="/Potensi-Dukuh" className="text-white-50 text-decoration-none small">Potensi Dukuh</Link>
              <Link to="/Agenda" className="text-white-50 text-decoration-none small">Agenda</Link>
              <Link to="/Lembaga-Masyarakat" className="text-white-50 text-decoration-none small">Lembaga</Link>
            </div>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Wilayah</h6>
            <div className="d-flex flex-column gap-2">
              <a href="https://www.google.com/maps/d/u/0/viewer?mid=1nUZNsSP7ro-jZAqgE3r74K75KtguF_M&femb=1&ll=-7.8856475010263996%2C110.30198600000003&z=18" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">Kedung 1</a>
              <a href="https://goo.gl/maps/XGsiEp7XweDXoQ798" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">Kedung 2</a>
              <a href="https://goo.gl/maps/fYdcp1VFtasSd2Tx7" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">Kedung 3</a>
              <a href="https://www.google.com/maps/d/u/0/viewer?mid=1XR0hTRQRcfa8iykCK_ph-d9ospuOuIM" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">Kedung 4</a>
              <a href="https://goo.gl/maps/o4v7MAnQfYHzKgRu8" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">Kedung 5</a>
              <a href="https://goo.gl/maps/t4em7VVUNS6bCaJr6" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">Kedung 6</a>
            </div>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Kontak</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-2 text-white-50 small">
                <FaHome className="mt-1 flex-shrink-0" />
                <span>Kedung, Guwosari, Kec. Pajangan, Kab. Bantul, DIY</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50 small">
                <FaEnvelope className="flex-shrink-0" />
                <a href="mailto:Padukuhankedung@gmail.com" className="text-white-50 text-decoration-none">Padukuhankedung@gmail.com</a>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50 small">
                <FaInstagram className="flex-shrink-0" />
                <a href="https://www.instagram.com/opik.1965/" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none">@opik.1965</a>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50 small">
                <FaTiktok className="flex-shrink-0" />
                <a href="https://www.tiktok.com/@pemuda.pemudi.ked" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none">@pemuda.pemudi.ked</a>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50 small">
                <FaYoutube className="flex-shrink-0" />
                <a href="https://www.youtube.com/@PemudaPemudiKedung" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none">Pemuda Pemudi Kedung</a>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50 small">
                <FaMapMarkerAlt className="flex-shrink-0" />
                <a href="https://maps.app.goo.gl/fXGrqwhpPoT4eyxY8?g_st=aw" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none">Lihat Peta</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="text-center py-3 border-top border-white border-opacity-10" style={{ backgroundColor: '#0f3a0f' }}>
        <a href="https://si.almaata.ac.id/" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none small">
          © {new Date().getFullYear()} KKN-T 03 Sistem Informasi, Universitas Alma Ata x Tim IT Padukuhan Kedung
        </a>
      </div>
    </footer>
  );
}

export default FooterApp;
