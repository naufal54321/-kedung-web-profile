import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AgendaDetailModal from '../agenda/AgendaDetail'; // Import AgendaDetailModal

const AgendaItem = ({ agenda }) => {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getStatus = (agenda) => {
    const currentDate = new Date();
    const startDate = new Date(agenda.dateStart);
    const endDate = new Date(agenda.dateEnd);

    if (currentDate > endDate) {
      return 'Selesai';
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return 'Sedang Berlangsung';
    } else {
      return 'Akan Datang';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Akan Datang':
        return 'bg-secondary-green';
      case 'Sedang Berlangsung':
        return 'bg-secondary-yellow';
      case 'Selesai':
        return 'bg-secondary-red';
      default:
        return '';
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card className="mb-4 shadow custom-font position-relative">
        <Card.Body>
          <div style={{ maxWidth: '100%' }}> {/* Atur lebar maksimum untuk menghindari overflow horizontal */}
            <img className='rounded' src={agenda.imgUrl} alt={agenda.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
          </div>
          <Card.Title className='custom-font mt-4'>{agenda.name}</Card.Title>
          <div className="d-flex align-items-center mb-4">
            <FaCalendarAlt className="mr-2 mb-4 icon-space" />
            <p className="mb-4">{formatDate(agenda.dateStart)}</p>
          </div>
          <p className={`position-absolute top-0 end-0 p-2 rounded ${getStatusStyle(getStatus(agenda))}`}>{getStatus(agenda)}</p>
          <Button className="position-absolute button-new bottom-0 end-0 mx-4 mb-4" variant="success" onClick={() => setShowModal(true)}>Lihat Detail</Button>
        </Card.Body>
      </Card>
      
      {/* Modal */}
      <AgendaDetailModal show={showModal} handleClose={handleModalClose} agenda={agenda} />
    </>
  );
};

export default AgendaItem;
