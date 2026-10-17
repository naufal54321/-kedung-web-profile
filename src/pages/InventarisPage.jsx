import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Form, Image, Button, Table } from 'react-bootstrap'
import { FaPrint } from 'react-icons/fa'
import api from '../utils/api'
import ProfilHero from '../components/Profil/ProfilHero'
import SEO from '../components/SEO'

const KONDISI_CONFIG = {
  baik: { text: 'Baik', bg: 'success' },
  rusak_ringan: { text: 'Rusak Ringan', bg: 'warning text-dark' },
  rusak_berat: { text: 'Rusak Berat', bg: 'danger' }
}

const STATUS_FILTER_OPTIONS = [
  { value: 'semua', label: 'Semua Status' },
  { value: 'tersedia', label: 'Tersedia' },
  { value: 'sebagian', label: 'Sebagian Disewa' },
  { value: 'habis', label: 'Habis Disewa' }
]

function getStatusDerived(item) {
  const jumlah = item.jumlah || 0
  const disewa = item.jumlahDisewa || 0
  if (disewa >= jumlah && jumlah > 0) return { key: 'habis', text: 'Habis Disewa', bg: 'danger' }
  if (disewa > 0) return { key: 'sebagian', text: 'Sebagian Disewa', bg: 'warning text-dark' }
  return { key: 'tersedia', text: 'Tersedia', bg: 'success' }
}

function formatRupiah(n) {
  return `Rp ${(n || 0).toLocaleString('id-ID')}`
}

function InventarisPage() {
  const [inventarisList, setInventarisList] = useState([])
  const [filterPemilik, setFilterPemilik] = useState('Semua')
  const [filterStatus, setFilterStatus] = useState('semua')
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

  const filteredData = inventarisList.filter(item => {
    const matchPemilik = filterPemilik === 'Semua' || item.pemilik === filterPemilik
    const status = getStatusDerived(item)
    const matchStatus = filterStatus === 'semua' || status.key === filterStatus
    return matchPemilik && matchStatus
  })

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
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ width: 'auto', minWidth: 160 }}
                aria-label="Filter status"
              >
                {STATUS_FILTER_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Form.Select>
              {pemilikOptions.length > 1 && (
                <Form.Select
                  value={filterPemilik}
                  onChange={(e) => setFilterPemilik(e.target.value)}
                  style={{ width: 'auto', minWidth: 160 }}
                  aria-label="Filter pemilik"
                >
                  {pemilikOptions.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Form.Select>
              )}
              <Button variant="outline-dark" size="sm" onClick={() => window.print()} title="Cetak Laporan">
                <FaPrint /> Cetak
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />
              <p className="mt-2 text-muted">Memuat data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted fs-5">Tidak ada data inventaris</p>
              <p className="text-muted small">Data inventaris akan ditampilkan di sini setelah ditambahkan oleh admin.</p>
            </div>
          ) : (
            <>
              <Row className="g-4">
                {filteredData.map(item => {
                  const kondisi = KONDISI_CONFIG[item.kondisi] || KONDISI_CONFIG.baik
                  const status = getStatusDerived(item)
                  const sisa = (item.jumlah || 0) - (item.jumlahDisewa || 0)
                  return (
                    <Col md={6} lg={4} key={item.id}>
                      <Card className={`inventaris-card h-100 border-0 shadow-sm ${status.key === 'habis' ? 'inventaris-dipinjam' : ''}`}>
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
                            <Badge bg={status.bg}>{status.text}</Badge>
                          </div>
                          <div className="d-flex flex-wrap gap-3 mb-2">
                            <small><strong>Total:</strong> {item.jumlah || 0} unit</small>
                            <small><strong>Sisa:</strong> <span className={sisa === 0 ? 'text-danger' : 'text-success'}>{sisa} unit</span></small>
                            {item.hargaSewa > 0 && <small><strong>Sewa:</strong> {formatRupiah(item.hargaSewa)}/unit</small>}
                          </div>
                          {item.lokasiPenyimpanan && (
                            <small className="text-muted d-block mb-1">📍 {item.lokasiPenyimpanan}</small>
                          )}
                          {(item.jumlahDisewa || 0) > 0 && (item.sewaAktif || item.peminjam) && (
                            <div className="inventaris-peminjam-info mb-2">
                              <small className="d-block"><strong>Peminjam:</strong> {item.sewaAktif?.nama || item.peminjam?.nama}</small>
                              {(item.sewaAktif?.jumlahSewa || 0) > 0 && <small className="d-block text-muted">Jumlah: {item.sewaAktif.jumlahSewa} unit</small>}
                              {item.sewaAktif?.alasan && <small className="d-block text-muted">Alasan: {item.sewaAktif.alasan}</small>}
                              {(item.sewaAktif?.tanggalPinjam || item.peminjam?.tanggalPinjam) && (
                                <small className="d-block text-muted">
                                  Pinjam: {item.sewaAktif?.tanggalPinjam || item.peminjam?.tanggalPinjam}
                                  {(item.sewaAktif?.tanggalKembali || item.peminjam?.tanggalKembali) ? ` - ${item.sewaAktif?.tanggalKembali || item.peminjam?.tanggalKembali}` : ''}
                                </small>
                              )}
                              {item.sewaAktif?.totalBiaya > 0 && (
                                <small className="d-block"><strong className="text-success">Biaya: {formatRupiah(item.sewaAktif.totalBiaya)}</strong></small>
                              )}
                            </div>
                          )}
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

              <div className="inventaris-print-table d-none">
                <h3 className="mb-3">Laporan Inventaris - Padukuhan Kedung</h3>
                <p className="text-muted">Dicetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <Table bordered size="sm" className="mt-3">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Barang</th>
                      <th>Pemilik</th>
                      <th>Total</th>
                      <th>Sisa</th>
                      <th>Harga Sewa</th>
                      <th>Lokasi</th>
                      <th>Kondisi</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, i) => {
                      const status = getStatusDerived(item)
                      const sisa = (item.jumlah || 0) - (item.jumlahDisewa || 0)
                      return (
                        <tr key={item.id}>
                          <td>{i + 1}</td>
                          <td>{item.namaBarang}</td>
                          <td>{item.pemilik || '-'}</td>
                          <td>{item.jumlah || 0}</td>
                          <td>{sisa}</td>
                          <td>{item.hargaSewa ? formatRupiah(item.hargaSewa) : '-'}</td>
                          <td>{item.lokasiPenyimpanan || '-'}</td>
                          <td>{KONDISI_CONFIG[item.kondisi]?.text || item.kondisi}</td>
                          <td>{status.text}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}

export default InventarisPage
