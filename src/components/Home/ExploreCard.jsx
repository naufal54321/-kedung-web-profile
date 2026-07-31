import { Link } from 'react-router-dom';
import { FaNewspaper, FaLeaf, FaStore, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const exploreItems = [
  { icon: FaNewspaper, label: 'Berita Terkini', desc: 'Update informasi berita terkini seputar Padukuhan Kedung', link: '/Semua-Berita', color: '#2C5F2D' },
  { icon: FaLeaf, label: 'Toga & Hayati', desc: 'Tanaman Toga serta Sumber Daya Hayati dan Non Hayati', link: '/Hayati-NonHayati', color: '#2E7D32' },
  { icon: FaStore, label: 'Potensi Dukuh', desc: 'Daftar UMKM yang ada di Dukuh Kedung', link: '/Potensi-Dukuh', color: '#1565C0' },
  { icon: FaCalendarAlt, label: 'Agenda', desc: 'Jadwal kegiatan dan agenda masyarakat', link: '/Agenda', color: '#E65100' },
];

const ExploreCard = () => {
  return (
    <div className="container">
      <div className="row g-4 justify-content-center">
        {exploreItems.map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay={index * 100}>
            <Link to={item.link} className="explore-card-link">
              <div className="explore-card">
                <div className="explore-card-icon" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon style={{ color: item.color, fontSize: 28 }} />
                </div>
                <h5 className="explore-card-title">{item.label}</h5>
                <p className="explore-card-desc">{item.desc}</p>
                <span className="explore-card-action">
                  Jelajahi <FaArrowRight size={11} />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCard;
