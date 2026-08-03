// HayatiItem.jsx

const HayatiItem = ({ hayati }) => {
  return (
    <div className="col-md-3">
      <div className="card mb-4">
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={hayati.imgUrl}
            className="card-img-top"
            alt={hayati.name}
            loading="lazy"
            decoding="async"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
          />
        </div>
        <div className="card-body">
          <h5 className="card-title custom-font text-center">{hayati.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default HayatiItem;
