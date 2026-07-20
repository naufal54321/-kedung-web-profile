import React from 'react';

const LocationInfo = () => {
  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ maxWidth: '300px' }}>
          <img src="/svg/welcome.svg" alt="Dukuh Kedung" className="img-fluid rounded d-none d-md-block" />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center bg-white p-4 ">
          <h2>Website Resmi Dukuh Kedung</h2>
          <p>
            Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Dukuh Kedung adalah sebuah desa yang terletak di Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta. Kami menyediakan informasi terbaru seputar kegiatan masyarakat, potensi dukuh, dan berbagai fitur lain yang dapat diakses oleh masyarakat umum.
          </p>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ maxWidth: '300px' }}>
          <img src="/svg/welcome.svg" alt="Dukuh Kedung" className="img-fluid rounded d-none d-md-block" />
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
