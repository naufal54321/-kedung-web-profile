import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import LembagaMasyarakat from '../pages/LembagaMasyarakat';
import DetailArticlePage from '../pages/DetailArticlePage';
import DetailUmkmPage from '../pages/DetailUmkmPage';
import DeveloperCard from '../components/Home/DeveloperList';
import AgendaPage from '../pages/AgendaPage';
import AgendaDetailModal from '../components/agenda/AgendaDetail';
import ScrollToTop from './ScrollOnTop';

function KedungApp() {
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const navigate = useNavigate();

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
      <header>
        <NavApp />
      </header>
      <main style={{ paddingTop: '80px' }}>
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
        </Routes>
        <AgendaDetailModal show={showAgendaModal} handleClose={handleCloseAgendaModal} agenda={selectedAgenda} />
      </main>
      <FooterApp />
    </div>
  );
}

export default KedungApp;
