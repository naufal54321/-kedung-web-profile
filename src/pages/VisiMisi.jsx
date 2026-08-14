import { Row, Col } from 'react-bootstrap';
import ProfilHero from '../components/Profil/ProfilHero';
import SEO from '../components/SEO';
import { FaBullseye, FaTasks } from 'react-icons/fa';

const VISI = 'Menjadi Padukuhan yang mandiri, berbudaya, dan berdaya saing menuju masyarakat yang sejahtera, religius, dan berwawasan lingkungan.';

const MISI = [
  'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan',
  'Mengembangkan potensi ekonomi lokal dan UMKM',
  'Melestarikan budaya dan kearifan lokal',
  'Meningkatkan infrastruktur dan pelayanan publik',
  'Memperkuat kelembagaan masyarakat',
  'Menjaga kelestarian lingkungan hidup',
  'Meningkatkan partisipasi masyarakat dalam pembangunan',
];

function VisiMisi() {
  return (
    <main className="profil-page">
      <SEO title="Visi &amp; Misi" description="Visi dan Misi Padukuhan Kedung" />
      <ProfilHero
        title="Visi & Misi"
        subtitle="Arah dan tujuan pembangunan Padukuhan Kedung"
      />
      <div className="container py-4">
        <Row className="g-4 align-items-stretch">
          <Col md={6} data-aos="fade-up">
            <div className="vm-card">
              <div className="vm-icon vm-icon-visi">
                <FaBullseye />
              </div>
              <h3 className="vm-title">Visi</h3>
              <p className="vm-text">{VISI}</p>
            </div>
          </Col>
          <Col md={6} data-aos="fade-up" data-aos-delay="100">
            <div className="vm-card">
              <div className="vm-icon vm-icon-misi">
                <FaTasks />
              </div>
              <h3 className="vm-title">Misi</h3>
              <ul className="vm-list">
                {MISI.map((misi, index) => (
                  <li key={index}>
                    <span className="vm-num">{index + 1}</span>
                    {misi}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default VisiMisi;
