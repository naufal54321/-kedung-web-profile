import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { FaCamera, FaChevronLeft, FaChevronRight, FaExpand, FaArrowRight } from 'react-icons/fa';
import api from '../../utils/api';

function PhotoSection() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef(null);

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

  const cardStep = () => {
    const strip = stripRef.current;
    if (!strip) return 300;
    const card = strip.querySelector('.photo-card');
    return card ? card.offsetWidth + 24 : 300;
  };

  const scrollByCard = (dir) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: dir * cardStep(), behavior: 'smooth' });
  };

  const handleScroll = () => {
    const strip = stripRef.current;
    if (!strip || fotos.length === 0) return;
    const idx = Math.round(strip.scrollLeft / cardStep());
    setActiveIndex(Math.max(0, Math.min(fotos.length - 1, idx)));
  };

  const scrollToCard = (i) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollTo({ left: i * cardStep(), behavior: 'smooth' });
    setActiveIndex(i);
  };

  const openPhoto = (foto, index) => {
    setActive(foto);
    setActiveIndex(index);
    setShow(true);
  };

  return (
    <div className="container">
      <div className="section-card" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title">Galeri Foto</h2>
          <Link to="/Galeri" className="section-link">
            Lihat Semua <FaArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="d-flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-card-lg p-0 photo-card-skeleton">
                <div className="skeleton" style={{ height: 200, borderRadius: '16px 16px 0 0' }} />
                <div className="p-3">
                  <div className="skeleton skeleton-line w-70" />
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
          <>
            <div className="photo-strip-wrap" data-aos="fade-up">
              <button type="button" className="photo-arrow photo-arrow-left" onClick={() => scrollByCard(-1)} aria-label="Geser ke kiri">
                <FaChevronLeft />
              </button>
              <div className="photo-strip" ref={stripRef} onScroll={handleScroll}>
                {fotos.map((foto, i) => (
                  <button key={foto.id} type="button" className="photo-card" onClick={() => openPhoto(foto, i)}>
                    <div className="photo-thumb">
                      <img src={foto.imgUrl} alt={foto.caption || 'Foto galeri'} loading="lazy" decoding="async" onLoad={(e) => e.currentTarget.classList.add('photo-loaded')} />
                      <span className="photo-zoom">
                        <FaExpand />
                      </span>
                      {foto.caption && <div className="photo-caption">{foto.caption}</div>}
                    </div>
                  </button>
                ))}
              </div>
              <button type="button" className="photo-arrow photo-arrow-right" onClick={() => scrollByCard(1)} aria-label="Geser ke kanan">
                <FaChevronRight />
              </button>
            </div>
            {fotos.length > 1 && (
              <div className="photo-dots">
                {fotos.map((foto, i) => (
                  <button
                    key={foto.id}
                    type="button"
                    className={`photo-dot${i === activeIndex ? ' active' : ''}`}
                    onClick={() => scrollToCard(i)}
                    aria-label={`Ke foto ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg" className="video-modal">
        <Modal.Header closeButton>
          <Modal.Title className="video-modal-title">
            {active && (active.caption || 'Foto Galeri')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {active && (
            <img
              src={active.imgUrl}
              alt={active.caption || 'Foto galeri'}
              className="photo-lightbox-img"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PhotoSection;