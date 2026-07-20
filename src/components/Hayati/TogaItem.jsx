import React from 'react';
import { Link } from 'react-router-dom';

function TogaItem({ toga }) {
  return (
    <div className="col-md-3">
      <Link to={`/toga/${toga.id}`} className="text-decoration-none">
        <div className="card mb-4 h-100">
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img
              src={toga.imgUrl}
              className="card-img-top"
              alt={toga.name}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
            />
          </div>
          <div className="card-body">
            <h5 className="card-title custom-font text-center mb-4">{toga.name}</h5>
            <Link to={`/toga/${toga.id}`} className="btn btn-success button-new position-absolute bottom-0 end-0 mx-2 mb-2">Lihat Detail</Link>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TogaItem;
