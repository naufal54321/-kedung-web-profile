import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { FaCamera, FaChevronLeft, FaChevronRight, FaExpand, FaArrowRight } from 'react-icons/fa';
import api from '../../utils/api';

const AUTOPLAY_MS = 4500;

function PhotoSection() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef(null);
  const scrollTimerRef = useRef(null);

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

  // Pindah dan senterkan kartu pada indeks tertentu ke tengah container
  const centerScrollTo = (i) => {
    const strip = stripRef.current;
    if (!strip) return;
    const index = Math.max(0, Math.min(fotos.length - 1, i));
    const card = strip.children[index];
    if (!card) return;
    const target = card.offsetLeft - (strip.clientWidth - card.clientWidth) / 2;
    strip.scrollTo({ left: target, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const scrollByCard = (dir) => {
    centerScrollTo(activeIndex + dir);
  };

  // Saat scroll manual, aktifkan kartu yang paling dekat ke tengah container
  // Debounce agar tidak bertabrakan dengan effect scroll otomatis (mencegah loop)
  const handleScroll = () => {
    const strip = stripRef.current;
    if (!strip || fotos.length === 0) return;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      const cards = strip.querySelectorAll('.photo-card');
      if (cards.length === 0) return;
      const center = strip.scrollLeft + strip.clientWidth / 2;
      let closest = 0;
      let min = Infinity;
      cards.forEach((card, i) => {
        const mid = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }, 150);
  };

  const scrollToCard = (i) => {
    centerScrollTo(i);
  };

  const openPhoto = (foto, index) => {
    setActive(foto);
    setActiveIndex(index);
    setShow(true);
  };

  // Auto-play: geser otomatis ke foto berikutnya, berhenti saat hover/fokus/kurang dari 2 foto
  useEffect(() => {
    if (fotos.length < 2 || paused) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % fotos.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [fotos.length, paused]);

  // Ikuti perubahan activeIndex dengan scroll sentral ke kartu aktif (dari auto-play/klik)
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || fotos.length === 0) return;
    const card = strip.children[activeIndex];
    if (!card) return;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const viewCenter = strip.scrollLeft + strip.clientWidth / 2;
    // Guard: hanya scroll bila kartu aktif belum dekat pusat (hindari loop saat user drag)
    if (Math.abs(cardCenter - viewCenter) < 12) return;
    const target = card.offsetLeft - (strip.clientWidth - card.clientWidth) / 2;
    strip.scrollTo({ left: target, behavior: 'smooth' });
  }, [activeIndex, fotos.length]);

  // Bersihkan timer debounce saat unmount
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

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
            <div
              className="photo-strip-wrap"
              data-aos="fade-up"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <button type="button" className="photo-arrow photo-arrow-left" onClick={() => scrollByCard(-1)} aria-label="Geser ke kiri">
                <FaChevronLeft />
              </button>
              <div className="photo-strip" ref={stripRef} onScroll={handleScroll}>
                {fotos.map((foto, i) => (
                  <button
                    key={foto.id}
                    type="button"
                    className={`photo-card${i === activeIndex ? ' active' : ''}`}
                    onClick={() => openPhoto(foto, i)}
                  >
                    <div className="photo-thumb">
                      <img src={foto.imgUrl} alt={foto.caption || 'Foto galeri'} loading="lazy" decoding="async" />
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