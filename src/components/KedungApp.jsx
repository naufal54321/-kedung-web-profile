import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavApp from './NavApp';
import FooterApp from './FooterApp';
import AgendaDetailModal from './agenda/AgendaDetail';
import ScrollToTop from './ScrollOnTop';
import ScrollTopFab from './ScrollTopFab';
import UpdatePrompt from './UpdatePrompt';
import ProtectedRoute from './Admin/ProtectedRoute';
import LoadingScreen from './LoadingScreen';

const HomePage = lazy(() => import('../pages/HomePage'));
const VisiMisi = lazy(() => import('../pages/VisiMisi'));
const StrukturPemerintahan = lazy(() => import('../pages/StrukturPemerintahan'));
const Sejarah = lazy(() => import('../pages/Sejarah'));
const PotensiDusun = lazy(() => import('../pages/PotensiDusun'));
const Hayati = lazy(() => import('../pages/Hayati'));
const TogaDetailPage = lazy(() => import('../pages/TogaDetailPage'));
const SemuaBeritaPage = lazy(() => import('../pages/SemuaBeritaPage'));
const LembagaMasyarakat = lazy(() => import('../pages/LembagaMasyarakat'));
const DetailArticlePage = lazy(() => import('../pages/DetailArticlePage'));
const DetailUmkmPage = lazy(() => import('../pages/DetailUmkmPage'));
const DeveloperCard = lazy(() => import('../components/Home/DeveloperList'));
const AgendaPage = lazy(() => import('../pages/AgendaPage'));
const DaftarUmkmPage = lazy(() => import('../pages/DaftarUmkmPage'));
const KontakPage = lazy(() => import('../pages/KontakPage'));
const GaleriPage = lazy(() => import('../pages/GaleriPage'));
const PersyaratanPage = lazy(() => import('../pages/PersyaratanPage'));
const InventarisPage = lazy(() => import('../pages/InventarisPage'));
const LoginPage = lazy(() => import('./Admin/LoginPage'));
const Dashboard = lazy(() => import('./Admin/Dashboard'));

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
        <Suspense fallback={<LoadingScreen />}>
          <div className="page-transition" key={location.pathname}>
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
            <Route path="/Kontak" element={<KontakPage />} />
            <Route path="/Galeri" element={<GaleriPage />} />
              <Route path="/Persyaratan-Pelayanan" element={<PersyaratanPage />} />
              <Route path="/Inventaris-RT" element={<InventarisPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/artikel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/umkm" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/struktur" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/lembaga" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/hayati" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/nonhayati" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/toga" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/carousel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/agenda" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/video" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/foto" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/pesan" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/komentar" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/inventaris" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
          </div>
        </Suspense>
        <AgendaDetailModal show={showAgendaModal} handleClose={handleCloseAgendaModal} agenda={selectedAgenda} />
      </main>
      {!isAdmin && <FooterApp />}
      {!isAdmin && <ScrollTopFab />}
      <UpdatePrompt />
    </div>
  );
}

export default KedungApp;
