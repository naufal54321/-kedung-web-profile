import React, { useEffect } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function ImagePreview({ show, imageUrl, onClose, title }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = '' };
  }, [show]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (show) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [show, onClose]);

  if (!show || !imageUrl) return null;

  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div className="image-preview-header">
        {title && <span className="image-preview-title">{title}</span>}
        <button className="image-preview-close" onClick={onClose}>
          <FaTimes size={20} />
        </button>
      </div>
      <div className="image-preview-body" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={title || 'Preview'} loading="lazy" className="image-preview-img" />
      </div>
    </div>
  );
}

export default ImagePreview;
