import React, { useEffect } from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UmkmDetail = ({ umkm }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleGoFoodClick = () => {
    window.open(umkm.gofood, '_blank');
  };

  const handleShopeeFoodClick = () => {
    window.open(umkm.shopeefood, '_blank');
  };

  const handleGrabFoodClick = () => {
    window.open(umkm.grabfood, '_blank');
  };

  return (
    <section className='custom-font'>
      <h4 className='bg-white rounded p-4 text-center mt-3' data-aos="zoom-out-down">{umkm.name}</h4>
      <div className='bg-white p-2 rounded mt-3 mb-3'>
        <Row>
          {/* For mobile view, move image and iframe to be above the right-aligned column */}
          <Col xs={12} md={12}>
            <div className='d-flex align-items-center flex-column-reverse flex-md-row'>
            <Col xs={12} md={8} className='text-content-right' data-aos="zoom-out-down" style={{ textAlign: 'justify' }}>
                <p className='bg-secondary-green p-4 rounded mx-4'>Owner: {umkm.owner}</p>
                <div className='mx-4 p-4 bg-secondary-green rounded' data-aos="zoom-out-down">
                  
                  <table>
                    <tbody>
                      <tr><td>Kategori</td><td>:</td><td>{umkm.category}</td></tr>
                      <tr><td>Harga</td><td>:</td><td>{umkm.price}</td></tr>
                      <tr><td>Kontak</td><td>:</td><td>{umkm.contact}</td></tr>
                    </tbody>
                  </table>
                  <p className='mt-2'>{umkm.description}</p>
                  <div className="mt-4">
                    <Button className="mx-2" variant="success" onClick={handleGoFoodClick}>
                      <FaShoppingBag /> GoFood
                    </Button>
                    <Button className="mx-2" variant="success" onClick={handleShopeeFoodClick}>
                      <FaShoppingBag /> ShopeeFood
                    </Button>
                    <Button className="mx-2" variant="success" onClick={handleGrabFoodClick}>
                      <FaShoppingBag /> GrabFood
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div style={{ height: '250px', overflow: 'hidden' }}>
                <img className='img-fluid rounded p-4' data-aos="zoom-out-down" src={umkm.imgUrl} alt={umkm.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div className='mt-2 p-4'>
                  <iframe
                      title="Google Maps"
                      src={umkm.address}
                      width="600"
                      height="450"
                      className='bg-white w-100 height-umkm-map'
                      allowFullScreen={true}
                      loading="lazy"
                      data-aos="zoom-out-down"
                      style={{ border: 0 }}
                    ></iframe>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="p-4" data-aos="zoom-out-down">
              <h5 className='bg-secondary-green p-4 rounded text-center'>KATALOG</h5>
              <Row>
                {Object.values(umkm.catalogue).map(catalog => (
                  <Col md={3} key={catalog.id}>
                    <Card>
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <Card.Img variant="top" src={catalog.imgUrl} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </div>
                      <Card.Body className='bg-secondary-green mx-2 mt-2 mb-2 rounded'>
                        <Card.Title className='custom-font'>{catalog.name}</Card.Title>
                          <Card.Text>
                            Price: <FaMoneyBillWave className="mr-2" /> {catalog.price}
                          </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default UmkmDetail;
