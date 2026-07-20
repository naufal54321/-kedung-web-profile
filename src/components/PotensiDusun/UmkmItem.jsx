import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const UmkmItem = ({ umkm }) => {
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...';
    } else {
      return description;
    }
  };

  return (
    <div className="mb-4 shadow poppins-medium">
      <Row>
        <Col xs={12} md={4}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img 
              src={umkm.imgUrl} 
              className="img-fluid rounded"
              alt={umkm.name}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        </Col>
        <Col xs={12} md={8} className='position-relative'>
          <div className="p-3 custom-font">
            <h5>
              <Link to={`/detail-Umkm/${umkm.id}`} className="text-decoration-none text-dark">{umkm.name}</Link>
            </h5>
            <div className="d-flex align-items-center mb-4 mt-4">
              <FaUser className="mr-2 icon-space" />
              <p className="mb-0"> {umkm.owner}</p>
              <div className="flex-fill"></div> {/* Ini adalah spacer */}
              <FaCalendarAlt className="mr-2 icon-space" />
              <p className="mb-0"> {umkm.category}</p>
            </div>
            <p className='custom-font'>{truncateDescription(umkm.description)}</p>
            <Button
              as={Link}
              to={`/detail-Umkm/${umkm.id}`}
              className="position-absolute button-new bottom-0 end-0 mx-4 mb-4"
              variant="success"
            >
              Lihat Detail
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UmkmItem;
