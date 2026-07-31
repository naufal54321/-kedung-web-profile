import ProfilHero from '../components/Profil/ProfilHero';
import ProfilCard from '../components/Profil/ProfilCard';
import SEO from '../components/SEO';

function Sejarah() {
  return (
    <main className="profil-page">
      <SEO title="Sejarah" description="Sejarah berdirinya Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta." />
      <ProfilHero
        title="Sejarah Padukuhan"
        subtitle="Mengenal asal-usul dan perjalanan Padukuhan Kedung dari masa ke masa"
      />
      <div className="container py-4">
        <ProfilCard title="Sejarah Padukuhan">
          <p className="profil-text">
            Padukuhan Kedung terletak di Kalurahan Guwosari, Kecamatan Pajangan, 
            Kabupaten Bantul. Padukuhan Kedung memiliki 4 RT, yang terdiri dari 
            RT 1, RT 2, RT 3 dan RT 4. Setiap RT memiliki ciri khasnya sendiri. 
            Jumlah penduduk di Padukuhan Kedung tergolong ramai berdasarkan KK 
            (Kartu Keluarga) yang ada di Padukuhan Kedung.
          </p>
        </ProfilCard>

        <ProfilCard title="Sejarah Kepemimpinan">
          <p className="profil-text text-muted">
            Informasi segera menyusul
          </p>
        </ProfilCard>
    </div>
  </main>
  );
}

export default Sejarah;
