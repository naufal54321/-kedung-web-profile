import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function TogaItem({ toga }) {
  return (
    <div className="col-6 col-md-4 col-lg-3" data-aos="fade-up">
      <Link to={`/toga/${toga.id}`} className="text-decoration-none h-100 d-block">
        <div className="sda-card">
          <div className="sda-image">
            <img src={toga.imgUrl} alt={toga.name} loading="lazy" decoding="async" />
            <span className="sda-badge">TOGA</span>
          </div>
          <div className="sda-body">
            <h5 className="sda-name">{toga.name}</h5>
            <span className="sda-link">Lihat Detail <FaArrowRight size={11} /></span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TogaItem;
