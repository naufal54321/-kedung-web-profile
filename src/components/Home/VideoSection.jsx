import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaYoutube, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import api from '../../utils/api';

const CHANNEL_URL = 'https://www.youtube.com/@PemudaPemudiKedung';

function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchVideos = async () => {
      try {
        const adminVideos = await api.getAllVideos();
        if (cancelled) return;
        if (adminVideos.length > 0) {
          setVideos(adminVideos.map((v) => ({ id: v.videoId, title: v.title, published: v.published })));
          setLoading(false);
          return;
        }
        const response = await fetch('/api/youtube-videos.js');
        const data = await response.json();
        if (!cancelled) setVideos(Array.isArray(data.videos) ? data.videos : []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        if (!cancelled) setVideos([]);
      }
      if (!cancelled) setLoading(false);
    };
    fetchVideos();
    return () => { cancelled = true; };
  }, []);

  const openVideo = (video) => {
    setActive(video);
    setShow(true);
  };

  return (
    <div className="container">
      <div className="section-card" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title">Video Terbaru</h2>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="section-link">
            Kunjungi Channel <FaExternalLinkAlt size={11} />
          </a>
        </div>

        {loading ? (
          <div className="row g-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="col-md-4">
                <div className="skeleton-card-lg p-0">
                  <div className="skeleton" style={{ height: 170, borderRadius: '16px 16px 0 0' }} />
                  <div className="p-3">
                    <div className="skeleton skeleton-line w-90 mb-2" />
                    <div className="skeleton skeleton-line w-60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-5">
            <FaYoutube size={44} className="text-muted mb-3" />
            <p className="text-muted mb-3">Belum ada video terbaru</p>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="video-channel-btn">
              <FaYoutube className="me-1" /> Buka Channel YouTube
            </a>
          </div>
        ) : (
          <div className="row g-4">
            {videos.slice(0, 3).map((video) => (
              <div key={video.id} className="col-md-4" data-aos="fade-up">
                <button type="button" className="video-card" onClick={() => openVideo(video)}>
                  <div className="video-thumb">
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="video-play">
                      <FaPlay />
                    </span>
                  </div>
                  <div className="video-body">
                    <h5 className="video-title">{video.title}</h5>
                    <span className="video-date">
                      <FaYoutube size={11} className="me-1" />
                      {formatDate(video.published)}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg" className="video-modal">
        <Modal.Header closeButton>
          <Modal.Title className="video-modal-title">
            {active && active.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {active && (
            <div className="video-embed">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoSection;
