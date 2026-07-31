
function ProfilHero({ title, subtitle }) {
  return (
    <div className="profil-hero" data-aos="fade-down">
      <div className="profil-hero-orb" />
      <div className="profil-hero-content">
        <h1 className="profil-hero-title">{title}</h1>
        {subtitle && <p className="profil-hero-desc">{subtitle}</p>}
      </div>
    </div>
  );
}

export default ProfilHero;
