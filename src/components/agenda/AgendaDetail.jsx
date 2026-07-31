import { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import ImagePreview from '../ImagePreview';
import { formatDate } from '../../utils/formatDate';

const AgendaDetailModal = ({ show, handleClose, agenda }) => {
  const [preview, setPreview] = useState(null);

  if (!agenda) return null;

  const { name = '', description = '', dateStart = '', dateEnd = '', lokasi = '', maps = '', imgUrl = '' } = agenda;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold" style={{ color: '#1a4d1a' }}>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Row className="g-3">
          {imgUrl && (
            <Col md={6}>
              <img src={imgUrl} alt={name} loading="lazy" className="rounded w-100" style={{ maxHeight: 300, objectFit: 'contain', background: 'var(--bg)', cursor: 'pointer' }} onClick={() => setPreview({ url: imgUrl, title: name })} />
            </Col>
          )}
          <Col md={imgUrl ? 6 : 12}>
            {description && <p className="text-muted mb-3" style={{ lineHeight: 1.7 }}>{description}</p>}
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2 text-muted small">
                <FaCalendarAlt className="text-success" /> <strong>Mulai:</strong> {formatDate(dateStart)}
              </div>
              <div className="d-flex align-items-center gap-2 text-muted small">
                <FaCalendarAlt className="text-success" /> <strong>Selesai:</strong> {formatDate(dateEnd)}
              </div>
              {lokasi && (
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <FaMapMarkerAlt className="text-success" /> <strong>Lokasi:</strong> {lokasi}
                </div>
              )}
            </div>
            {maps && (
              <div className="mt-3">
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="180"
                  src={maps}
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 0, borderRadius: 10 }}
                />
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={handleClose}>Tutup</Button>
      </Modal.Footer>
      <ImagePreview show={!!preview} imageUrl={preview?.url} title={preview?.title} onClose={() => setPreview(null)} />
    </Modal>
  );
};

export default AgendaDetailModal;
