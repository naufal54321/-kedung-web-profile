import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Form, Image } from 'react-bootstrap'
import api from '../utils/api'
import ProfilHero from '../components/Profil/ProfilHero'
import SEO from '../components/SEO'

const KONDISI_CONFIG = {
  baik: { text: 'Baik', bg: 'success' },
  rusak_ringan: { text: 'Rusak Ringan', bg: 'warning text-dark' },
  rusak_berat: { text: 'Rusak Berat', bg: 'danger' }
}

const STATUS_PINJAM_CONFIG = {
  tidak_dipinjam: { text: 'Tersedia', bg: 'success' },
  dipinjam: { text: 'Dipinjam', bg: 'danger' }
}

function InventarisPage() {
  const [inventarisList, setInventarisList] = useState([])
  const [filterPemilik, setFilterPemilik] = useState('Semua')
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

  const pemilikOptions = ['Semua', ...new Set(inventarisList.map(item => item.pemilik).filter(Boolean))]

  const filteredData = filterPemilik === 'Semua'
    ? inventarisList
    : inventarisList.filter(item => item.pemilik === filterPemilik)

  return (
    <>
      <SEO title="Inventaris" description="Daftar inventaris barang Padukuhan Kedung" />
      <ProfilHero
        title="Inventaris"
        subtitle="Daftar inventaris barang milik RT dan Karang Taruna Padukuhan Kedung"
      />

      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h5 className="fw-bold m-0" style={{ color: '#2C5F2D' }}>
              Daftar Inventaris Barang
            </h5>
            {pemilikOptions.length > 1 && (
              <div className="d-flex align-items-center gap-2">
                <label className="m-0 text-muted small">Filter:</label>
                <Form.Select
                  value={filterPemilik}
                  onChange={(e) => setFilterPemilik(e.target.value)}
                  style={{ width: 'auto', minWidth: 160 }}
                >
                  {pemilikOptions.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Form.Select>
              </div>
            )}
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
                const statusPinjam = STATUS_PINJAM_CONFIG[item.statusPinjam] || STATUS_PINJAM_CONFIG.tidak_dipinjam
                return (
                  <Col md={6} lg={4} key={item.id}>
                    <Card className={`inventaris-card h-100 border-0 shadow-sm ${item.statusPinjam === 'dipinjam' ? 'inventaris-dipinjam' : ''}`}>
                      {item.foto && (
                        <div className="inventaris-card-img">
                          <Image src={item.foto} alt={item.namaBarang} fluid className="w-100" style={{ height: 180, objectFit: 'cover' }} />
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold fs-6 mb-2">{item.namaBarang}</Card.Title>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          <Badge bg="primary">{item.pemilik || '-'}</Badge>
                          <Badge bg={kondisi.bg}>{kondisi.text}</Badge>
                          <Badge bg={statusPinjam.bg}>{statusPinjam.text}</Badge>
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
