import { useState, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { FaCamera, FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../utils/api';
import ProfilHero from '../components/Profil/ProfilHero';
import SEO from '../components/SEO';

function GaleriPage() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchFotos = async () => {
      try {
        const list = await api.getAllFotos();
        if (!cancelled) setFotos(list);
      } catch (error) {
        console.error('Error fetching fotos:', error);
        if (!cancelled) setFotos([]);
      }
      if (!cancelled) setLoading(false);
    };
    fetchFotos();
    return () => { cancelled = true; };
  }, []);

  const openPhoto = (index) => {
    setActiveIndex(index);
    setShow(true);
  };

  const prevPhoto = () => {
    setActiveIndex((i) => (i - 1 + fotos.length) % fotos.length);
  };

  const nextPhoto = () => {
    setActiveIndex((i) => (i + 1) % fotos.length);
  };

  const active = fotos[activeIndex] || null;

  return (
    <main className="profil-page">
      <SEO title="Galeri Foto" description="Kumpulan foto dan dokumentasi kegiatan Padukuhan Kedung" />
      <ProfilHero title="Galeri Foto" subtitle="Dokumentasi kegiatan Padukuhan Kedung" />

      <Container className="py-4">
        {loading ? (
          <div className="row g-3 g-md-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-4">
                <div className="skeleton-card-lg p-0">
                  <div className="skeleton" style={{ height: 220, borderRadius: '16px 16px 0 0' }} />
                  <div className="p-3">
                    <div className="skeleton skeleton-line w-70" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : fotos.length === 0 ? (
          <div className="text-center py-5">
            <FaCamera size={44} className="text-muted mb-3" />
            <p className="text-muted mb-0">Belum ada foto galeri</p>
          </div>
        ) : (
          <div className="row g-3 g-md-4">
            {fotos.map((foto, i) => (
              <div key={foto.id} className="col-6 col-md-4 col-lg-4" data-aos="fade-up">
                <button type="button" className="photo-card photo-card-grid w-100" onClick={() => openPhoto(i)}>
                  <div className="photo-thumb">
                    <img src={foto.imgUrl} alt={foto.caption || 'Foto galeri'} loading="lazy" decoding="async" />
                    <span className="photo-zoom">
                      <FaExpand />
                    </span>
                    {foto.caption && <div className="photo-caption">{foto.caption}</div>}
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </Container>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg" className="video-modal">
        <Modal.Header closeButton>
          <Modal.Title className="video-modal-title">
            {active && (active.caption || 'Foto Galeri')}
          </Modal.Title>
          {active && fotos.length > 1 && (
            <span className="photo-counter ms-auto me-4">
              {activeIndex + 1} / {fotos.length}
            </span>
          )}
        </Modal.Header>
        <Modal.Body className="p-0 position-relative">
          {active && (
            <img
              src={active.imgUrl}
              alt={active.caption || 'Foto galeri'}
              className="photo-lightbox-img"
            />
          )}
          {fotos.length > 1 && (
            <>
              <button type="button" className="photo-lightbox-nav photo-lightbox-prev" onClick={prevPhoto} aria-label="Foto sebelumnya">
                <FaChevronLeft />
              </button>
              <button type="button" className="photo-lightbox-nav photo-lightbox-next" onClick={nextPhoto} aria-label="Foto berikutnya">
                <FaChevronRight />
              </button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default GaleriPage;