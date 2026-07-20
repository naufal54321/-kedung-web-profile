import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const AgendaDetailModal = ({ show, handleClose, agenda }) => {
  if (!agenda) return null;

  const { id, name, description, dateStart, dateEnd, lokasi, maps } = agenda;

  // Fungsi untuk memformat tanggal menjadi format yang lebih mudah dibaca
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p>{description}</p>
            <p><strong>Start:</strong> {formatDate(dateStart)}</p>
            <p><strong>End:</strong> {formatDate(dateEnd)}</p>
            <p><strong>Lokasi:</strong> {lokasi}</p>
          </Col>
          <Col md={6}>
            <div>
              <strong>Maps:</strong> <br />
              <iframe
                title="Google Maps"
                width="100%"
                height="200"
                frameBorder="0"
                src={maps}
                allowFullScreen
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgendaDetailModal;
