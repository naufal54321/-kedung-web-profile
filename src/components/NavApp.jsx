import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from './DropdownButton';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuthState } from './Admin/useAuthState';
import { FaNewspaper, FaStore, FaCalendarAlt, FaUsers as FaUsersIcon, FaCode, FaShieldAlt, FaSun, FaMoon, FaEnvelope, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

function NavApp() {
  const { user } = useAuthState();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('kedung-theme') || 'light');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.documentElement.removeAttribute('data-theme');
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kedung-theme', theme);
  }, [theme, location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isHome = location.pathname === '/';
  const navbarState = isHome && !scrolled ? 'navbar-transparent' : 'navbar-solid';

  return (
    <Navbar expand="lg" className={`${navbarState} shadow-sm py-2 fixed-top`} data-aos="fade-down">
      <Container className="ps-lg-3">
        <Navbar.Brand href="/" className="d-flex align-items-center gap-3">
          <img alt="" src="/img/logo-bantul.png" style={{ width: 38, height: 48, objectFit: 'contain', display: 'block' }} />
          <div className="brand-text-container">
            <span className="brand-text">Padukuhan Kedung</span>
            <span className="brand-additional-text">Guwosari, Pajangan, Bantul</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <button type="button" className="theme-toggle ms-2" onClick={toggleTheme} aria-label="Ganti tema" title="Ganti tema">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-0">
            <Nav.Item>
              <Link to="/" className={`nav-link rounded px-2 text-nowrap ${location.pathname === '/' ? 'active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}>
                Beranda
              </Link>
            </Nav.Item>
            <Nav.Item>
              <DropdownButton />
            </Nav.Item>
            <Nav.Item>
              <Link to="/Semua-Berita" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 ${location.pathname === '/Semua-Berita' ? 'active' : ''}`}
                aria-current={location.pathname === '/Semua-Berita' ? 'page' : undefined}>
                <FaNewspaper size={14} /> Berita
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Potensi-Dukuh" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 ${location.pathname === '/Potensi-Dukuh' ? 'active' : ''}`}
                aria-current={location.pathname === '/Potensi-Dukuh' ? 'page' : undefined}>
                <FaStore size={14} /> Potensi Kedung
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Agenda" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 ${location.pathname === '/Agenda' ? 'active' : ''}`}
                aria-current={location.pathname === '/Agenda' ? 'page' : undefined}>
                <FaCalendarAlt size={14} /> Agenda
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Lembaga-Masyarakat" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 ${location.pathname === '/Lembaga-Masyarakat' ? 'active' : ''}`}
                aria-current={location.pathname === '/Lembaga-Masyarakat' ? 'page' : undefined}>
                <FaUsersIcon size={14} /> Lembaga
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Tentang-Developer" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 ${location.pathname === '/Tentang-Developer' ? 'active' : ''}`}
                aria-current={location.pathname === '/Tentang-Developer' ? 'page' : undefined}>
                <FaCode size={14} /> Developer
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Kontak" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 ${location.pathname === '/Kontak' ? 'active' : ''}`}
                aria-current={location.pathname === '/Kontak' ? 'page' : undefined}>
                <FaEnvelope size={14} /> Kontak
              </Link>
            </Nav.Item>
            {user && (
              <Nav.Item>
                <Link to="/admin" className={`nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1 text-success fw-bold ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                aria-current={location.pathname.startsWith('/admin') ? 'page' : undefined}>
                  <FaShieldAlt size={14} /> Admin
                </Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link as="button" className="nav-link rounded px-2 text-nowrap d-flex align-items-center gap-1" onClick={() => setShowSearch(true)} aria-label="Cari" title="Cari">
                <FaSearch size={14} /> Cari
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <SearchOverlay show={showSearch} onClose={() => setShowSearch(false)} />
    </Navbar>
  );
}

export default NavApp;
