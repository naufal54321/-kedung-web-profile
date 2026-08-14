import { useState, useEffect } from 'react';
import { getAllDevelopers } from '../../utils/developer';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import SEO from '../SEO';

const DeveloperCard = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    setDevelopers(getAllDevelopers());
  }, []);

  const openSocialMedia = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO title="Tentang Developer" description="Tim pengembang dan kontributor website resmi Padukuhan Kedung." />
      <div className="row g-4 justify-content-center">
        {developers.map((developer) => (
          <div key={developer.id} className="col-md-4 col-sm-6">
            <div className="dev-card">
              <div className="dev-card-avatar">
                <img src={developer.imageUrl} alt={developer.name} loading="lazy" />
              </div>
              <h5 className="dev-card-name">{developer.name}</h5>
              <p className="dev-card-job">{developer.job}</p>
              <div className="dev-card-social">
                {developer.instagram && (
                  <button className="dev-social-btn" onClick={() => openSocialMedia(developer.instagram)}>
                    <FaInstagram />
                  </button>
                )}
                {developer.github && (
                  <button className="dev-social-btn" onClick={() => openSocialMedia(developer.github)}>
                    <FaGithub />
                  </button>
                )}
                {developer.linkedin && (
                  <button className="dev-social-btn" onClick={() => openSocialMedia(developer.linkedin)}>
                    <FaLinkedin />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeveloperCard;
