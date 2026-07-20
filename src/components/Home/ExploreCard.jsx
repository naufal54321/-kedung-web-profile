import React from 'react';

const ExploreCard = () => {
  return (
    <div className="container d-flex justify-content-center gap-4 flex-wrap mt-5">
      <div className="card card-explore-first position-relative mb-4" style={{ width: '260px' }}>
        <img
          className="w-75 position-absolute top-0 start-50 translate-middle"
          src="/svg/artikel.svg"
          alt="explore card"
        />
        <div className="card-body text-center mt-4">
          <h5 className="card-title mb-2 mt-5"><a href="#artikel" style={{ textDecoration: 'none', color: 'inherit' }}>Berita Terkini</a></h5>
          <p className="card-text">Berisi daftar update informasi berita terkini.</p>
        </div>
      </div>

      <div className="card card-explore-first position-relative mb-4" style={{ width: '260px' }}>
        <img
          className="w-75 position-absolute top-0 start-50 translate-middle"
          src="/svg/toga.svg"
          alt="explore card"
        />
        <div className="card-body text-center mt-4">
          <h5 className="card-title mb-2 mt-5"><a href="/Hayati-NonHayati" style={{ textDecoration: 'none', color: 'inherit' }}>Toga</a></h5>
          <p className="card-text">Berisi daftar Tanaman Toga serta Sumber Daya Hayati dan Non Hayati</p>
        </div>
      </div>

      <div className="card card-explore position-relative mb-4" style={{ width: '260px' }}>
        <img
          className="w-75 position-absolute top-0 start-50 translate-middle"
          src="/svg/potensi.svg"
          alt="explore card"
        />
        <div className="card-body text-center mt-4">
          <h5 className="card-title mb-2 mt-5"><a href="/Potensi-Dukuh" style={{ textDecoration: 'none', color: 'inherit' }}>Potensi Dukuh</a></h5>
          <p className="card-text">Berisi Daftar UMKM yang ada di dukuh Kedung</p>
        </div>
      </div>

      <div className="card card-explore position-relative mb-4" style={{ width: '260px' }}>
        <img
          className="w-75 position-absolute top-0 start-50 translate-middle"
          src="/svg/agenda.svg"
          alt="explore card"
        />
        <div className="card-body text-center mt-4">
          <h5 className="card-title mb-2 mt-5"><a href="/agenda" style={{ textDecoration: 'none', color: 'inherit' }}>Agenda</a></h5>
          <p className="card-text">Berisi daftar agenda dan kalendar agenda baik yang sudah selesai, sedang berlangsung maupun akan datang</p>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
