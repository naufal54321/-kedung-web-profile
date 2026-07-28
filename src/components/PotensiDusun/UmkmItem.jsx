import React from 'react';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UmkmItem = ({ umkm }) => {
  const truncateDesc = (text) => {
    const words = text?.split(' ') || [];
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : text;
  };

  const formatPrice = (price) => {
    if (!price) return null;
    const prefix = price.toLowerCase().includes('mulai') ? '' : 'Mulai ';
    const clean = price.replace(/^Mulai\s*/i, '');
    return `${prefix}${clean.startsWith('Rp') ? clean : `Rp ${clean}`}`;
  };

  const price = formatPrice(umkm.price);
  const waUrl = umkm.contact
    ? `https://wa.me/${umkm.contact.replace(/[^0-9]/g, '')}`
    : null;

  return (
    <div className="umkm-new-card">
      {/* Clickable card → detail */}
      <Link to={`/detail-Umkm/${umkm.id}`} className="text-decoration-none d-block">
        <div className="umkm-new-image">
          <img src={umkm.imgUrl} alt={umkm.name} />
          <span className="umkm-new-badge">{umkm.category || 'UMKM'}</span>
        </div>
        <div className="umkm-new-body">
          <h3 className="umkm-new-name">{umkm.name}</h3>
          <p className="umkm-new-desc">{truncateDesc(umkm.description)}</p>
          <div className="umkm-new-footer">
            {price && <span className="umkm-new-price">{price}</span>}
            <span className="umkm-new-link">Lihat Detail <FaArrowRight size={12} /></span>
          </div>
        </div>
      </Link>

      {/* WhatsApp button — outside Link */}
      {waUrl && (
        <div className="umkm-new-wa-wrapper">
          <button
            className="umkm-new-btn"
            onClick={() => window.open(waUrl, '_blank')}
          >
            <FaWhatsapp size={14} /> Hubungi Penjual
          </button>
        </div>
      )}
    </div>
  );
};

export default UmkmItem;
