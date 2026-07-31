import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CardVisiMisi() {
  return (
    <Container className=''>
      <Row className='justify-content-between gap-4'>
        <Col className='rounded bg-white p-2'>
            <h3 className='text-center mb-4'>Visi</h3>
            <p className='p-4 mb-3'>Menjadi sebuah padukuhan yang sejahtera, berdaya saing, dan berkelanjutan dalam mempertahankan kearifan lokal serta meningkatkan kesejahteraan seluruh warganya.</p>
        </Col>
        <Col className='rounded bg-white p-2'>
            <h3 className='text-center p-2 mb-4'>Misi</h3>
            <div className='p-4 mb-3' style={{ minHeight: '298px' }}>
              <ol>
                <li>Meningkatkan kesejahteraan dan kehidupan berkualitas bagi seluruh penduduk Dukuh Kedung melalui pengembangan ekonomi lokal yang berkelanjutan.</li>
                <li>Melestarikan dan mempromosikan kearifan lokal serta budaya tradisional sebagai bagian integral dari identitas dan keberlangsungan padukuhan.</li>
                <li>Mendorong partisipasi aktif masyarakat dalam pengambilan keputusan dan pelaksanaan program pembangunan untuk memastikan inklusivitas dan keadilan sosial.</li>
                <li>Mengembangkan infrastruktur dasar seperti akses ke pendidikan, kesehatan, dan transportasi untuk meningkatkan kualitas hidup penduduk.</li>
                <li>Memperkuat kerjasama antara warga, pemerintah setempat, dan pihak terkait lainnya dalam menjaga lingkungan alam sekitar serta pengelolaan sumber daya alam secara berkelanjutan.</li>
                <li>Menyediakan peluang dan fasilitas bagi pengembangan potensi ekonomi masyarakat lokal, termasuk melalui pengembangan pertanian, peternakan, dan sektor usaha lainnya.</li>
                <li>Menjamin akses yang adil dan merata terhadap pelayanan dasar seperti pendidikan, kesehatan, dan fasilitas umum bagi semua lapisan masyarakat tanpa memandang status sosial atau ekonomi.</li>
              </ol>
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CardVisiMisi;
