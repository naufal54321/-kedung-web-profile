import React from 'react';
import { FaMapMarkerAlt, FaHome } from 'react-icons/fa';

const LocationInfo = () => {
  return (
    <div className="location-modern" data-aos="fade-up">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="location-card" data-aos="fade-up">
              <div className="location-icon" data-aos="zoom-in" data-aos-delay="100">
                <img
                  src="/svg/logo kedung web.png"
                  alt="Dukuh Kedung"
                />
              </div>

              <h2 className="location-title" data-aos="fade-up" data-aos-delay="200">
                Website Resmi Padukuhan Kedung
              </h2>

              <div className="location-divider" data-aos="fade-up" data-aos-delay="300" />

              <p className="location-subtitle" data-aos="fade-up" data-aos-delay="300">
                <FaMapMarkerAlt className="me-1" />
                Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta
              </p>

              <p className="location-desc" data-aos="fade-up" data-aos-delay="400">
                Padukuhan Kedung adalah sebuah desa yang terletak di Kalurahan Guwosari,
                Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta. Kami menyediakan informasi
                terbaru seputar kegiatan masyarakat, potensi padukuhan, dan berbagai fitur
                lain yang dapat diakses oleh masyarakat umum.
              </p>

              <div className="location-stats" data-aos="fade-up" data-aos-delay="500">
                <div className="stat-item">
                  <div className="stat-icon-wrapper">
                    <FaHome className="stat-icon" />
                  </div>
                  <span className="stat-value">4</span>
                  <span className="stat-label">RT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;