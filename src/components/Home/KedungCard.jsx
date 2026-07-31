
const KedungCard = ({ kedung }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="kedung-card">
        <div className="kedung-card-header">
          <span className="kedung-card-badge">Wilayah</span>
          <h5 className="kedung-card-name">{kedung.name}</h5>
        </div>
        <div className="kedung-card-map">
          <iframe
            src={kedung.link}
            title={kedung.name}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default KedungCard;
