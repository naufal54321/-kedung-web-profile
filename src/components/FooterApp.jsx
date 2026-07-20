import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaEnvelope, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FooterApp() {
  return (
    <footer className="bg-secondary-green text-center text-lg-start text-muted">
      <section className="bg-primary-green text-white d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Mari terhubung dengan kami melalui sosial media</span>
        </div>

        <div>
          <a href="#!" className="me-4 text-reset">
            <FaFacebookF />
          </a>
          <a href="#!" className="me-4 text-reset">
            <FaTwitter />
          </a>
          <a href="#!" className="me-4 text-reset">
            <FaGoogle />
          </a>
          <a href="#!" className="me-4 text-reset">
            <FaInstagram />
          </a>
        </div>
      </section>
      <section className="py-4">
        <Container>
          <Row>
            <Col md="1" lg="1" xl="1" className="mb-2 footer-image">
                <img src="/img/logo-bantul.png" alt="logo-bantul" />
            </Col>
            <Col md="4" lg="4" xl="4" className="mb-2">
              <h6 className="text-uppercase fw-bold mb-4">Dusun Kedung</h6>
              <p>
                Website dusun dibangun dengan tujuan sebagai media pelayanan publik resmi dusun, yang dibangun dan dikelola oleh tim dusun setempat. Dengan memanfaatkan website penyelenggaraan pelayanan publik dapat dilakukan secara cepat dan mudah
              </p>
            </Col>

            <Col md="1" lg="1" xl="1" className="mb-2">
              <h6 className="text-uppercase fw-bold mb-4">Wilayah</h6>
              <p>
                <a href="https://www.google.com/maps/d/u/0/viewer?mid=1nUZNsSP7ro-jZAqgE3r74K75KtguF_M&femb=1&ll=-7.8856475010263996%2C110.30198600000003&z=18" target="_blank" rel="noopener noreferrer" className="text-reset">Kedung 1</a>
              </p>
              <p>
                <a href="https://goo.gl/maps/XGsiEp7XweDXoQ798" target="_blank" rel="noopener noreferrer" className="text-reset">Kedung 2</a>
              </p>
              <p>
                <a href="https://goo.gl/maps/fYdcp1VFtasSd2Tx7" target="_blank" rel="noopener noreferrer" className="text-reset">Kedung 3</a>
              </p>
              <p>
                <a href="https://www.google.com/maps/d/u/0/viewer?mid=1XR0hTRQRcfa8iykCK_ph-d9ospuOuIM" target="_blank" rel="noopener noreferrer" className="text-reset">Kedung 4</a>
              </p>
              <p>
                <a href="https://goo.gl/maps/o4v7MAnQfYHzKgRu8" target="_blank" rel="noopener noreferrer" className="text-reset">Kedung 5</a>
              </p>
              <p>
                <a href="https://goo.gl/maps/t4em7VVUNS6bCaJr6" target="_blank" rel="noopener noreferrer" className="text-reset">Kedung 6</a>
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className="mb-2">
              <h6 className="text-uppercase fw-bold mb-4">Jelajahi</h6>
              <p>
                <Link to="/Sejarah" className="text-reset">Sejarah</Link>
              </p>
              <p>
                <Link to="/Struktur-Pemerintahan" className="text-reset">Struktur Pemerintahan</Link>
              </p>
              <p>
                <Link to="/Visi-Misi" className="text-reset">Visi & Misi</Link>
              </p>
              <p>
                <Link to="/Hayati-nonHayati" className="text-reset">Sumber Daya Hayati & Non-Hayati</Link>
              </p>
              <p>
                <Link to="/Potensi-Dusun" className="text-reset">Potensi Dusun</Link>
              </p>
              <p>
                <Link to="/Agenda" className="text-reset">Agenda</Link>
              </p>
              <p>
                <Link to="/Lembaga-Masyarakat" className="text-reset">Lembaga Masyarakat</Link>
              </p>
              <p>
                <Link to="/Tentang-Developer" className="text-reset">Tentang Developer</Link>
              </p>
            </Col>

            <Col md="4" lg="4" xl="4" className="mb-2">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <div className="mb-3">
                    <FaHome className="mx-2" />
                    Dusun Kedung, Guwosari, Kec. Pajangan, Kabupaten Bantul, Daerah Istimewa Yogyakarta
                </div>
                <div className="mb-3">
                    <FaEnvelope className="mx-2" />
                    Padukuhankedung@gmail.com
                </div>
                <div className='footer-campus-image mt-4'>
                  <a href="https://si.almaata.ac.id/" target="_blank" rel="noopener noreferrer">
                    <img src="/img/fkt-si.png" alt="logo-si-uaa" className="footer-image" />
                  </a>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#007849" fillOpacity="1" d="M0,96L80,122.7C160,149,320,203,480,224C640,245,800,235,960,224C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      <div className="text-center p-4 bg-primary-green text-white">
        <a href="https://si.almaata.ac.id/" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
          © {new Date().getFullYear()} KKN-T 03 Sistem Informasi, Universitas Alma Ata. All rights reserved.
        </a>
      </div>

    </footer>
  );
}

export default FooterApp;
