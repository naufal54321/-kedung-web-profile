import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Form, Image } from 'react-bootstrap'
import api from '../utils/api'
import ProfilHero from '../components/Profil/ProfilHero'
import SEO from '../components/SEO'

const RT_OPTIONS = ['Semua', 'RT 01', 'RT 02', 'RT 03', 'RT 04', 'RT 05', 'RT 06']

const KONDISI_CONFIG = {
  baik: { text: 'Baik', bg: 'success' },
  rusak_ringan: { text: 'Rusak Ringan', bg: 'warning text-dark' },
  rusak_berat: { text: 'Rusak Berat', bg: 'danger' }
}

function InventarisPage() {
  const [inventarisList, setInventarisList] = useState([])
  const [filterRt, setFilterRt] = useState('Semua')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInventaris = async () => {
      try {
        const data = await api.getAllInventaris()
        setInventarisList(data)
      } catch (error) {
        console.error('Gagal memuat data inventaris:', error)
      }
      setLoading(false)
    }
    fetchInventaris()
  }, [])

  const filteredData = filterRt === 'Semua'
    ? inventarisList
    : inventarisList.filter(item => item.rt === filterRt)

  return (
    <>
      <SEO title="Inventaris RT" description="Daftar inventaris barang Padukuhan Kedung" />
      <ProfilHero
        title="Inventaris RT"
        subtitle="Daftar inventaris barang milik RT di Padukuhan Kedung"
      />

      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h5 className="fw-bold m-0" style={{ color: '#2C5F2D' }}>
              Daftar Inventaris Barang
            </h5>
            <div className="d-flex align-items-center gap-2">
              <label className="m-0 text-muted small">Filter RT:</label>
              <Form.Select
                value={filterRt}
                onChange={(e) => setFilterRt(e.target.value)}
                style={{ width: 'auto', minWidth: 140 }}
              >
                {RT_OPTIONS.map(rt => (
                  <option key={rt} value={rt}>{rt}</option>
                ))}
              </Form.Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />
              <p className="mt-2 text-muted">Memuat data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted fs-5">Belum ada data inventaris</p>
              <p className="text-muted small">Data inventaris akan ditampilkan di sini setelah ditambahkan oleh admin.</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredData.map(item => {
                const kondisi = KONDISI_CONFIG[item.kondisi] || KONDISI_CONFIG.baik
                return (
                  <Col md={6} lg={4} key={item.id}>
                    <Card className="inventaris-card h-100 border-0 shadow-sm">
                      {item.foto && (
                        <div className="inventaris-card-img">
                          <Image src={item.foto} alt={item.namaBarang} fluid className="w-100" style={{ height: 180, objectFit: 'cover' }} />
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold fs-6 mb-2">{item.namaBarang}</Card.Title>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          <Badge bg="primary">{item.rt || '-'}</Badge>
                          <Badge bg={kondisi.bg}>{kondisi.text}</Badge>
                          <Badge bg="secondary">Jumlah: {item.jumlah || 0}</Badge>
                        </div>
                        {item.tanggalPerolehan && (
                          <small className="text-muted d-block mb-2">
                            Diperoleh: {new Date(item.tanggalPerolehan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </small>
                        )}
                        {item.keterangan && (
                          <Card.Text className="text-muted small flex-grow-1">{item.keterangan}</Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          )}
        </Container>
      </section>
    </>
  )
}

export default InventarisPage
