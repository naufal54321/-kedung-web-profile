import { useEffect, useState } from 'react';
import OrganizationChart from '../components/Struktur/OrganizationChart';
import api from '../utils/api';
import { Spinner } from 'react-bootstrap';
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
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
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
