import { useEffect, useState } from 'react';
import OrganizationChart from '../components/Struktur/OrganizationChart';
import api from '../utils/api';
import ProfilHero from '../components/Profil/ProfilHero';
import ProfilCard from '../components/Profil/ProfilCard';
import SEO from '../components/SEO';

function StrukturPemerintahan() {
  const [strukturs, setStrukturs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAllStrukturs();
        setStrukturs(response);
      } catch (error) {
        console.error('Error fetching strukturs:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="profil-page">
      <SEO title="Struktur Pemerintahan" description="Struktur pemerintahan Padukuhan Kedung" />
      <ProfilHero
        title="Struktur Pemerintahan"
        subtitle="Bagan organisasi pemerintahan Padukuhan Kedung"
      />
      <div className="container py-4">
        <ProfilCard title="Bagan Struktur Pemerintahan">
          {loading ? (
            <div className="d-flex flex-wrap justify-content-center gap-4 py-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-card-lg" style={{ width: 260, padding: '1.75rem' }}>
                  <div className="skeleton mx-auto mb-3" style={{ width: 84, height: 84, borderRadius: '50%' }} />
                  <div className="skeleton skeleton-line w-70 mx-auto mb-2" />
                  <div className="skeleton skeleton-line w-50 mx-auto" />
                </div>
              ))}
            </div>
          ) : strukturs.length === 0 ? (
            <p className="text-muted text-center mb-0">Belum ada data struktur.</p>
          ) : (
            <OrganizationChart data={strukturs} />
          )}
        </ProfilCard>
      </div>
    </main>
  );
}

export default StrukturPemerintahan;
