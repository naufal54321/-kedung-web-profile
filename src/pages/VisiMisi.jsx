import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProfilHero from '../components/Profil/ProfilHero';
import ProfilCard from '../components/Profil/ProfilCard';
import SEO from '../components/SEO';

function VisiMisi() {
  return (
    <main className="profil-page">
      <SEO title="Visi &amp; Misi" description="Visi dan Misi Padukuhan Kedung" />
      <ProfilHero
        title="Visi & Misi"
        subtitle="Arah dan tujuan pembangunan Padukuhan Kedung"
      />
      <div className="container py-4">
        <Row className="g-4">
          <Col md={6}>
            <ProfilCard title="Visi">
              <p className="profil-text">
                Menjadi Padukuhan yang mandiri, berbudaya, dan berdaya saing 
                menuju masyarakat yang sejahtera, religius, dan berwawasan lingkungan.
              </p>
            </ProfilCard>
          </Col>
          <Col md={6}>
            <ProfilCard title="Misi">
              <ol className="profil-list">
                <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan</li>
                <li>Mengembangkan potensi ekonomi lokal dan UMKM</li>
                <li>Melestarikan budaya dan kearifan lokal</li>
                <li>Meningkatkan infrastruktur dan pelayanan publik</li>
                <li>Memperkuat kelembagaan masyarakat</li>
                <li>Menjaga kelestarian lingkungan hidup</li>
                <li>Meningkatkan partisipasi masyarakat dalam pembangunan</li>
              </ol>
            </ProfilCard>
          </Col>
        </Row>
    </div>
  </main>
  );
}

export default VisiMisi;
