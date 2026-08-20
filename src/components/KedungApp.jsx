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
const LoginPage = lazy(() => import('./Admin/LoginPage'));
const Dashboard = lazy(() => import('./Admin/Dashboard'));
const ArticleForm = lazy(() => import('./Admin/ArticleForm'));
const UmkmForm = lazy(() => import('./Admin/UmkmForm'));
const StrukturForm = lazy(() => import('./Admin/StrukturForm'));
const LembagaForm = lazy(() => import('./Admin/LembagaForm'));
const CarouselForm = lazy(() => import('./Admin/CarouselForm'));
const AgendaForm = lazy(() => import('./Admin/AgendaForm'));
const VideoForm = lazy(() => import('./Admin/VideoForm'));
const PhotoForm = lazy(() => import('./Admin/PhotoForm'));
const HayatiForm = lazy(() => import('./Admin/HayatiForm'));

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
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/artikel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/umkm" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/struktur" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/lembaga" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/hayati" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/nonhayati" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/carousel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/agenda" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/video" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/foto" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/pesan" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/komentar" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/articles/new" element={<ProtectedRoute><ArticleForm /></ProtectedRoute>} />
            <Route path="/admin/articles/edit/:id" element={<ProtectedRoute><ArticleForm /></ProtectedRoute>} />
            <Route path="/admin/umkm/new" element={<ProtectedRoute><UmkmForm /></ProtectedRoute>} />
            <Route path="/admin/umkm/edit/:id" element={<ProtectedRoute><UmkmForm /></ProtectedRoute>} />
            <Route path="/admin/struktur/new" element={<ProtectedRoute><StrukturForm /></ProtectedRoute>} />
            <Route path="/admin/struktur/edit/:id" element={<ProtectedRoute><StrukturForm /></ProtectedRoute>} />
            <Route path="/admin/lembaga/new" element={<ProtectedRoute><LembagaForm /></ProtectedRoute>} />
            <Route path="/admin/lembaga/edit/:id" element={<ProtectedRoute><LembagaForm /></ProtectedRoute>} />
            <Route path="/admin/hayati/new" element={<ProtectedRoute><HayatiForm /></ProtectedRoute>} />
            <Route path="/admin/hayati/edit/:id" element={<ProtectedRoute><HayatiForm /></ProtectedRoute>} />
            <Route path="/admin/nonhayati/new" element={<ProtectedRoute><HayatiForm /></ProtectedRoute>} />
            <Route path="/admin/nonhayati/edit/:id" element={<ProtectedRoute><HayatiForm /></ProtectedRoute>} />
            <Route path="/admin/carousel/new" element={<ProtectedRoute><CarouselForm /></ProtectedRoute>} />
            <Route path="/admin/carousel/edit/:id" element={<ProtectedRoute><CarouselForm /></ProtectedRoute>} />
            <Route path="/admin/agenda/new" element={<ProtectedRoute><AgendaForm /></ProtectedRoute>} />
            <Route path="/admin/agenda/edit/:id" element={<ProtectedRoute><AgendaForm /></ProtectedRoute>} />
            <Route path="/admin/video/new" element={<ProtectedRoute><VideoForm /></ProtectedRoute>} />
            <Route path="/admin/video/edit/:id" element={<ProtectedRoute><VideoForm /></ProtectedRoute>} />
            <Route path="/admin/foto/new" element={<ProtectedRoute><PhotoForm /></ProtectedRoute>} />
            <Route path="/admin/foto/edit/:id" element={<ProtectedRoute><PhotoForm /></ProtectedRoute>} />
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
