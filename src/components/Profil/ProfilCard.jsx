
function ProfilCard({ title, children, className }) {
  return (
    <div className={`profil-card ${className || ''}`} data-aos="fade-up">
      {title && <h3 className="profil-card-title">{title}</h3>}
      <div className="profil-card-body">{children}</div>
    </div>
  );
}

export default ProfilCard;
