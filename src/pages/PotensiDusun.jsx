import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import api from '../utils/api';
import UmkmList from '../components/PotensiDusun/UmkmList';
import UmkmMap from '../components/PotensiDusun/UmkmMap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStore } from 'react-icons/fa';
import SEO from '../components/SEO';

function PotensiDusun() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getAllUmkm();
        setUmkmList(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching UMKM:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['semua', ...new Set(umkmList.map((u) => u.category).filter(Boolean))];
  const filtered = filter === 'semua' ? umkmList : umkmList.filter((u) => u.category === filter);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <main className="potensi-page">
      <SEO title="Potensi Dukuh" description="Potensi UMKM Padukuhan Kedung" />
      {/* Hero Section */}
      <section className="potensi-hero">
        <div className="potensi-hero-orb" />
        <div className="potensi-hero-content">
          <span className="potensi-badge">Potensi Padukuhan</span>
          <h1 className="potensi-hero-title">UMKM Lokal Kedung</h1>
          <p className="potensi-hero-desc">
            Mendukung karya dan karsa masyarakat Padukuhan Kedung. Temukan produk-produk unggulan lokal dari hasil bumi hingga kerajinan tangan berkualitas.
          </p>
        </div>
      </section>

      {/* Filter */}
      <Container className="mt-5 mb-4">
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`potensi-filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat === 'semua' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </Container>

      {/* UMKM Grid */}
      <Container className="pb-5">
        {filtered.length === 0 ? (
          <p className="text-center text-muted py-5">Belum ada UMKM di kategori ini.</p>
        ) : (
          <UmkmList umkmList={filtered} />
        )}
      </Container>

      {/* Peta UMKM */}
      <Container className="pb-5">
        <h2 className="section-title text-center mb-4">Peta Lokasi UMKM</h2>
        <UmkmMap umkmList={umkmList} />
      </Container>

      {/* CTA Banner */}
      <Container className="pb-5">
        <div className="potensi-cta">
          <div className="potensi-cta-bg-orb" />
          <div className="potensi-cta-content">
            <h2 className="potensi-cta-title">Miliki Usaha di Kedung?</h2>
            <p className="potensi-cta-desc">
              Daftarkan produk atau jasa Anda di direktori UMKM Padukuhan Kedung untuk menjangkau pasar yang lebih luas secara gratis.
            </p>
            <Link to="/Daftar-UMKM" className="potensi-cta-btn text-decoration-none">
              Daftarkan Usaha <FaArrowRight size={14} />
            </Link>
          </div>
          <div className="potensi-cta-icon">
            <FaStore size={80} />
          </div>
        </div>
      </Container>
    </main>
  );
}

export default PotensiDusun;
