const HayatiItem = ({ hayati }) => {
  return (
    <div className="col-6 col-md-4 col-lg-3" data-aos="fade-up">
      <div className="sda-card">
        <div className="sda-image">
          <img src={hayati.imgUrl} alt={hayati.name} loading="lazy" decoding="async" />
          <span className="sda-badge">Hayati</span>
        </div>
        <div className="sda-body">
          <h5 className="sda-name">{hayati.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default HayatiItem;
