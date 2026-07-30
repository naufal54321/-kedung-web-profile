import React from 'react';
import TogaList from '../components/Hayati/TogaList';
import HayatiList from '../components/Hayati/HayatiList';
import NonHayatiList from '../components/Hayati/NonHayatiList';
import SEO from '../components/SEO';
import ProfilHero from '../components/Profil/ProfilHero';
import ProfilCard from '../components/Profil/ProfilCard';

function Hayati() {
  return (
    <main className="profil-page">
      <SEO title="Toga &amp; Hayati" description="Kekayaan sumber daya alam hayati dan non hayati Padukuhan Kedung" />
      <ProfilHero
        title="Hayati & Non Hayati"
        subtitle="Kekayaan sumber daya alam Padukuhan Kedung"
      />
      <div className="container py-4">
        <ProfilCard>
          <p className="profil-text mb-0">
            Padukuhan Kedung mempunyai potensi sumber daya alam hayati yang meliputi 
            hutan, flora, dan fauna sedangkan sumber daya alam non hayati berupa bahan galian.
          </p>
        </ProfilCard>

        <ProfilCard title="1. Tanaman Obat Keluarga (TOGA)">
          <TogaList />
        </ProfilCard>

        <ProfilCard title="2. Sumber Daya Hayati">
          <HayatiList />
        </ProfilCard>

        <ProfilCard title="3. Sumber Daya Non Hayati">
          <NonHayatiList />
        </ProfilCard>
    </div>
  </main>
  );
}

export default Hayati;
