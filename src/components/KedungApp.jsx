import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavApp from './NavApp';
import FooterApp from './FooterApp';
import HomePage from '../pages/HomePage';
import VisiMisi from '../pages/VisiMisi';
import StrukturPemerintahan from '../pages/StrukturPemerintahan';
import Sejarah from '../pages/Sejarah';
import PotensiDusun from '../pages/PotensiDusun';
import Hayati from '../pages/Hayati';
import TogaDetailPage from '../pages/TogaDetailPage';
import SemuaBeritaPage from '../pages/SemuaBeritaPage';
import LembagaMasyarakat from '../pages/LembagaMasyarakat';
import DetailArticlePage from '../pages/DetailArticlePage';
import DetailUmkmPage from '../pages/DetailUmkmPage';
import DeveloperCard from '../components/Home/DeveloperList';
import AgendaPage from '../pages/AgendaPage';
import AgendaDetailModal from '../components/agenda/AgendaDetail';
import ScrollToTop from './ScrollOnTop';
import ProtectedRoute from './Admin/ProtectedRoute';
import LoginPage from './Admin/LoginPage';
import Dashboard from './Admin/Dashboard';
import ArticleForm from './Admin/ArticleForm';
import UmkmForm from './Admin/UmkmForm';
import StrukturForm from './Admin/StrukturForm';
import LembagaForm from './Admin/LembagaForm';
import CarouselForm from './Admin/CarouselForm';
import AgendaForm from './Admin/AgendaForm';
import DaftarUmkmPage from '../pages/DaftarUmkmPage';

function KedungApp() {
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({}); // Initialize AOS
  }, []); // Run once on component mount

  const handleAgendaClick = (agenda) => {
    setSelectedAgenda(agenda);
    setShowAgendaModal(true);
  };

  const handleCloseAgendaModal = () => {
    setSelectedAgenda(null);
    setShowAgendaModal(false);
    navigate('/Agenda'); // Kembali ke halaman agenda setelah menutup modal
  };

  return (
    <div className='bg-grey-custom poppins-medium mx-0'>
      {!isAdmin && (
        <header>
          <NavApp />
        </header>
      )}
      <main style={{ paddingTop: isAdmin ? '0' : '80px' }}>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Sejarah" element={<Sejarah />} />
          <Route path="/Potensi-Dukuh" element={<PotensiDusun />} />
          <Route path="/Hayati-NonHayati" element={<Hayati />} />
          <Route path="/Toga/:id" element={<TogaDetailPage />} />
          <Route path="/Visi-Misi" element={<VisiMisi />} />
          <Route path="/Struktur-Pemerintahan" element={<StrukturPemerintahan />} />
          <Route path="/Lembaga-Masyarakat" element={<LembagaMasyarakat />} />
          <Route path="/Tentang-Developer" element={<DeveloperCard />} /> 
          <Route path="/detail-Article/:id" element={<DetailArticlePage />} />
          <Route path="/detail-Umkm/:id" element={<DetailUmkmPage />} />
          <Route path="/Agenda" element={<AgendaPage handleAgendaClick={handleAgendaClick} />} />
          <Route path="/Semua-Berita" element={<SemuaBeritaPage />} />
          <Route path="/Daftar-UMKM" element={<DaftarUmkmPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/artikel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/umkm" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/struktur" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/lembaga" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/carousel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/agenda" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/articles/new" element={<ProtectedRoute><ArticleForm /></ProtectedRoute>} />
          <Route path="/admin/articles/edit/:id" element={<ProtectedRoute><ArticleForm /></ProtectedRoute>} />
          <Route path="/admin/umkm/new" element={<ProtectedRoute><UmkmForm /></ProtectedRoute>} />
          <Route path="/admin/umkm/edit/:id" element={<ProtectedRoute><UmkmForm /></ProtectedRoute>} />
          <Route path="/admin/struktur/new" element={<ProtectedRoute><StrukturForm /></ProtectedRoute>} />
          <Route path="/admin/struktur/edit/:id" element={<ProtectedRoute><StrukturForm /></ProtectedRoute>} />
          <Route path="/admin/lembaga/new" element={<ProtectedRoute><LembagaForm /></ProtectedRoute>} />
          <Route path="/admin/lembaga/edit/:id" element={<ProtectedRoute><LembagaForm /></ProtectedRoute>} />
          <Route path="/admin/carousel/new" element={<ProtectedRoute><CarouselForm /></ProtectedRoute>} />
          <Route path="/admin/carousel/edit/:id" element={<ProtectedRoute><CarouselForm /></ProtectedRoute>} />
          <Route path="/admin/agenda/new" element={<ProtectedRoute><AgendaForm /></ProtectedRoute>} />
          <Route path="/admin/agenda/edit/:id" element={<ProtectedRoute><AgendaForm /></ProtectedRoute>} />
        </Routes>
        <AgendaDetailModal show={showAgendaModal} handleClose={handleCloseAgendaModal} agenda={selectedAgenda} />
      </main>
      {!isAdmin && <FooterApp />}
    </div>
  );
}

export default KedungApp;
