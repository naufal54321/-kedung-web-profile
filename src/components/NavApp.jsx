import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from './DropdownButton';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

function NavApp() {
  const location = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleAboutDeveloperClick = () => {
    if (location.pathname === '/') {
      scrollToAboutDeveloper();
    } else {
      // Redirect to homepage and set aboutDeveloperPath for redirection
      window.location.href = '/';
    }
  };
  
  const scrollToAboutDeveloper = () => {
    const aboutDeveloperSection = document.getElementById('about-developer');
    if (aboutDeveloperSection) {
      aboutDeveloperSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar expand="lg" className="bg-secondary-green justify-content-between mx-0 poppins-medium fixed-top" data-aos="fade-down">
      <Container>
        <Navbar.Brand href="/" style={{ display: 'flex', alignItems: 'flex-start' }}>
          <img
            alt=""
            src="/img/logo-bantul.png"
            width="40"
            height="50"
            className="d-inline-block align-top"
          />
          <div className='brand-text-container'>
            <span className='brand-text'>Dukuh Kedung</span>
            <span className='brand-additional-text'>Guwosari, Pajangan, Bantul</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" activeKey={location.pathname}>
            <Nav.Item className='active-nav' data-aos="fade-up">
              <Link to="/" className="nav-link">Beranda</Link>
            </Nav.Item>
            <Nav.Item className='active-nav' data-aos="fade-up">
              <DropdownButton />
            </Nav.Item>
            <Nav.Item className='active-nav' data-aos="fade-up">
              <Link to="/Potensi-Dukuh" className="nav-link">Potensi Dukuh</Link>
            </Nav.Item>
            <Nav.Item className='active-nav' data-aos="fade-up">
              <Link to="/Agenda" className="nav-link">Agenda</Link>
            </Nav.Item>
            <Nav.Item className='active-nav' data-aos="fade-up">
              <Link to="/Lembaga-Masyarakat" className="nav-link">Lembaga Masyarakat</Link>
            </Nav.Item>
            <Nav.Item className='active-nav' data-aos="fade-up">
              <button className="nav-link" onClick={handleAboutDeveloperClick}>Developer</button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavApp;
