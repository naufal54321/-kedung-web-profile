import { Col, Row, Button } from 'react-bootstrap';
import { FaShoppingBag, FaMoneyBillWave, FaUser, FaTag, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { waShareUrl } from '../../utils/share';

const UmkmDetail = ({ umkm }) => {
  const handleOpenUrl = (url) => {
    if (url) window.open(url, '_blank');
  };

  const shareUrl = waShareUrl(`${umkm.name} — UMKM Padukuhan Kedung https://kedung-guwosari.vercel.app/detail-Umkm/${umkm.id}`);

  const formatRupiah = (price) => {
    if (!price) return '-';
    if (price.includes('Rp')) return price;
    return `Rp ${price}`;
  };

  return (
    <div className="umkm-detail-wrapper">
      <div className="umkm-detail-hero" data-aos="fade-up">
        <img src={umkm.imgUrl} alt={umkm.name} loading="eager" decoding="async" />
        <div className="umkm-detail-hero-overlay" />
        <div className="umkm-detail-hero-content">
          <h1 className="umkm-detail-title">{umkm.name}</h1>
          <p className="umkm-detail-owner"><FaUser /> {umkm.owner}</p>
          <a
            className="share-btn share-btn-wa mt-2"
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bagikan ke WhatsApp"
            title="Bagikan ke WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="umkm-detail-info" data-aos="fade-up">
        <Row className="g-3">
          <Col md={8}>
            <div className="info-card">
              <h5 className="info-card-title">Informasi UMKM</h5>
              <div className="info-grid">
                <div className="info-item">
                  <FaTag className="info-icon" />
                  <div>
                    <span className="info-label">Kategori</span>
                    <span className="info-value">{umkm.category || '-'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaMoneyBillWave className="info-icon" />
                  <div>
                    <span className="info-label">Harga</span>
                    <span className="info-value">{formatRupiah(umkm.price)}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <span className="info-label">Kontak</span>
                    <span className="info-value">{umkm.contact || '-'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <span className="info-label">Alamat</span>
                    <span className="info-value">
                      {umkm.address ? <a href={umkm.address} target="_blank" rel="noopener noreferrer">Lihat Peta</a> : '-'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="info-description">{umkm.description}</p>
            </div>
          </Col>

          <Col md={4}>
            <div className="info-card">
              <h5 className="info-card-title">Pesan Sekarang</h5>
              <div className="d-flex flex-column gap-2">
                {umkm.gofood && (
                  <Button variant="danger" className="food-btn" onClick={() => handleOpenUrl(umkm.gofood)}>
                    <FaShoppingBag /> GoFood
                  </Button>
                )}
                {umkm.shopeefood && (
                  <Button variant="warning" className="food-btn text-dark" onClick={() => handleOpenUrl(umkm.shopeefood)}>
                    <FaShoppingBag /> ShopeeFood
                  </Button>
                )}
                {umkm.grabfood && (
                  <Button variant="success" className="food-btn" onClick={() => handleOpenUrl(umkm.grabfood)}>
                    <FaShoppingBag /> GrabFood
                  </Button>
                )}
                {umkm.contact && (
                  <Button variant="success" className="food-btn" onClick={() => handleOpenUrl(`https://wa.me/${umkm.contact.replace(/[^0-9]/g, '')}`)}>
                    <FaWhatsapp size={16} /> WhatsApp
                  </Button>
                )}
                {!umkm.gofood && !umkm.shopeefood && !umkm.grabfood && !umkm.contact && (
                  <p className="text-muted text-center mb-0">Belum tersedia</p>
                )}
              </div>
            </div>

            {umkm.address && (
              <div className="info-card mt-3">
                <h5 className="info-card-title">Lokasi</h5>
                <iframe
                  title="Google Maps"
                  src={umkm.address}
                  width="100%"
                  height="200"
                  className="rounded"
                  allowFullScreen={true}
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>

      {umkm.catalogue && Object.keys(umkm.catalogue).length > 0 && (
        <div className="umkm-catalogue" data-aos="fade-up">
          <h5 className="catalogue-title">Katalog Produk</h5>
          <Row className="g-3">
            {Object.entries(umkm.catalogue).map(([key, catalog]) => (
              <Col md={3} key={key}>
                <div className="catalogue-card">
                  <div className="catalogue-card-image">
                    <img src={catalog.imgUrl} alt={catalog.name} loading="lazy" />
                  </div>
                  <div className="catalogue-card-body">
                    <h6 className="catalogue-card-name">{catalog.name}</h6>
                    <span className="catalogue-card-price"><FaMoneyBillWave /> {catalog.price}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default UmkmDetail;
