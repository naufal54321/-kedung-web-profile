import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ButtonCustom from './ButtonCustom';
import api from '../utils/api';
import { Spinner } from 'react-bootstrap';

const defaultSlides = [
  {
    imageUrl: '/img/carousel/slide-1.jpeg',
    caption: 'Selamat Datang Di Website Padukuhan Kedung',
    subtitle: 'Website resmi Padukuhan Kedung, Kalurahan Guwosari'
  },
  {
    imageUrl: '/img/carousel/slide-2.jpeg',
    caption: 'Mari Kenal Lebih Jauh',
    subtitle: 'Temukan potensi, budaya, dan informasi terkini'
  },
  {
    imageUrl: '/img/carousel/slide-3.jpeg',
    caption: 'Temukan Hal-hal Menarik',
    subtitle: 'Informasi seputar kegiatan masyarakat dan potensi desa'
  },
];

function CarouselCustom() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await api.getAllCarousels();
        if (data && data.length > 0) {
          setSlides(data);
        } else {
          setSlides(defaultSlides);
        }
      } catch {
        setSlides(defaultSlides);
      }
      setLoading(false);
    };
    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="home-carousel-wrapper d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="home-carousel-wrapper">
      <Carousel data-bs-theme="light" className='position-relative' interval={5000} fade pause={false}>
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id || index}>
            <img
              className="d-block w-100 carousel-image carousel-image-animated"
              src={slide.imageUrl}
              alt={slide.caption || `Slide ${index + 1}`}
            />
            <Carousel.Caption className="carousel-caption-modern d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
              <div className="caption-text">
                <h3>{slide.caption}</h3>
              </div>
              {slide.subtitle && (
                <p className="caption-subtitle">{slide.subtitle}</p>
              )}
              <div className="d-flex justify-content-center mt-5">
                <ButtonCustom />
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselCustom;
