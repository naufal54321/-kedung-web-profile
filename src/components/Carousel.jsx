import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import ButtonCustom from './ButtonCustom';

function CarouselCustom() {
  return (
    <Carousel data-bs-theme="light" className='position-relative'>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="/img/carousel/slide-1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
          <div className="animation">
            <h3>Selamat Datang Di Website Padukuhan Kedung</h3>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <ButtonCustom />
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="/img/carousel/slide-2.jpeg"
          alt="Second slide"
        />
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
          <div className="animation">
            <h3>Mari Kenal Lebih Jauh Mengenai Dukuh Kedung</h3>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <ButtonCustom />
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="/img/carousel/slide-3.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
          <div className="animation">
            <h3>Temukan Hal-hal Menarik Seputar Dukuh Kami !</h3>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <ButtonCustom />
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCustom;
