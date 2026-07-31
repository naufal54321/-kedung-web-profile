// HayatiItem.jsx

const NonHayatiItem = ({ nonhayati }) => {
  return (
    <div className="col-md-3">
      <div className="card mb-4">
        <div style={{ height: '200px', overflow: 'hidden' }}> {/* Set ukuran yang sama untuk gambar */}
          <img
            src={nonhayati.imgUrl}
            className="card-img-top"
            alt={nonhayati.name}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Agar gambar dipangkas sesuai dengan dimensi yang ditentukan
          />
        </div>
        <div className="card-body">
          <h5 className="card-title text-center custom-font">{nonhayati.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default NonHayatiItem;
