import ProfilHero from '../components/Profil/ProfilHero';
import SEO from '../components/SEO';
import { FaLandmark, FaHistory } from 'react-icons/fa';

function Sejarah() {
  return (
    <main className="profil-page">
      <SEO title="Sejarah" description="Sejarah berdirinya Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta." />
      <ProfilHero
        title="Sejarah Padukuhan"
        subtitle="Mengenal asal-usul dan perjalanan Padukuhan Kedung dari masa ke masa"
      />
      <div className="container py-4">
        <div className="vm-card" data-aos="fade-up">
          <div className="vm-icon vm-icon-visi">
            <FaLandmark />
          </div>
          <h3 className="vm-title">Sejarah Padukuhan</h3>
          <p className="vm-text">
            Padukuhan Kedung terletak di Kalurahan Guwosari, Kecamatan Pajangan,
            Kabupaten Bantul. Padukuhan Kedung memiliki 4 RT, yang terdiri dari
            RT 1, RT 2, RT 3 dan RT 4. Setiap RT memiliki ciri khasnya sendiri.
            Jumlah penduduk di Padukuhan Kedung tergolong ramai berdasarkan KK
            (Kartu Keluarga) yang ada di Padukuhan Kedung.
          </p>
        </div>

        <div className="vm-card" data-aos="fade-up" data-aos-delay="100">
          <div className="vm-icon vm-icon-misi">
            <FaHistory />
          </div>
          <h3 className="vm-title">Sejarah Kepemimpinan</h3>
          <div className="vm-info-badge">Informasi segera menyusul</div>
        </div>
      </div>
    </main>
  );
}

export default Sejarah;
