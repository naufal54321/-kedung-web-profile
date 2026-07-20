import React from 'react';
import { Card, Col } from 'react-bootstrap';

const KedungCard = ({ kedung }) => {
  return (
    <Col md={4} className='mb-3' >
      <Card className='shadow p-2 kedung-map-item'>
        <Card.Title className='text-center rounded shadow mb-3 p-2 bg-white'>{kedung.name}</Card.Title>
        <iframe
          className="embed-responsive-item iframe-map-kedung p-2"
          src={kedung.link}
          title={kedung.name}
          allowFullScreen
        ></iframe>
      </Card>
    </Col>
  );
};

export default KedungCard;
