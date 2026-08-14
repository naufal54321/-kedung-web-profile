import { useState, useEffect } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUser, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import api from '../utils/api';
import { formatDate } from '../utils/formatDate';
import CustomPagination from '../components/CustomPagination';
import ProfilHero from '../components/Profil/ProfilHero';
import SEO from '../components/SEO';
import { ARTICLE_CATEGORIES } from '../utils/categories';

function SemuaBeritaPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('semua');
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const categories = ['semua', ...ARTICLE_CATEGORIES];

  const filtered = articles.filter((a) => {
    const matchCategory = category === 'semua' || (a.category || 'Berita') === category;
    const q = search.trim().toLowerCase();
    const matchSearch = !q
      || (a.title || '').toLowerCase().includes(q)
      || (a.body || '').toLowerCase().includes(q)
      || (a.author || '').toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginate = (page) => setCurrentPage(page);

  if (loading) {
    return (
      <main className="profil-page">
        <ProfilHero title="Semua Berita" subtitle="Informasi terkini seputar Padukuhan Kedung" />
        <Container className="py-4">
          <div className="row g-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="skeleton-card-lg p-0">
                  <div className="skeleton" style={{ height: 200, borderRadius: '16px 16px 0 0' }} />
                  <div className="p-4">
                    <div className="skeleton skeleton-line w-50 mb-2" />
                    <div className="skeleton skeleton-line w-90 mb-2" />
                    <div className="skeleton skeleton-line w-70 mb-2" />
                    <div className="skeleton skeleton-line w-60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="profil-page">
      <SEO title="Berita" description="Informasi terkini seputar Padukuhan Kedung" />
      <ProfilHero title="Semua Berita" subtitle="Informasi terkini seputar Padukuhan Kedung" />
      <Container className="py-4">
        <div className="mb-4" data-aos="fade-up">
          <InputGroup className="berita-search">
            <InputGroup.Text className="berita-search-icon"><FaSearch size={14} /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Cari judul, isi, atau penulis..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </InputGroup>
          <div className="d-flex flex-wrap gap-2 berita-filters mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => { setCategory(cat); setCurrentPage(1); }}
                className={`potensi-filter-btn ${category === cat ? 'active' : ''}`}
              >
                {cat === 'semua' ? 'Semua' : cat}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="text-muted text-center py-5">Tidak ada berita yang cocok.</p>
        ) : (
          <>
            <div className="row g-4" data-aos="fade-up">
              {currentItems.map((article) => (
                <div key={article.id} className="col-md-6 col-lg-4">
                  <div className="news-card">
                    <Link to={`/detail-Article/${article.id}`} className="text-decoration-none">
                      <div className="news-card-image">
                        <img src={article.imgUrl} alt={article.title} loading="lazy" decoding="async" />
                        <div className="news-card-overlay" />
                        <span className="news-badge">{article.category || 'Berita'}</span>
                      </div>
                      <div className="news-card-body">
                        <div className="news-card-meta">
                          <span><FaUser size={11} /> {article.author}</span>
                          <span><FaCalendarAlt size={11} /> {formatDate(article.publishDate)}</span>
                        </div>
                        <h5 className="news-card-title">{article.title}</h5>
                        <p className="news-card-desc">
                          {article.body?.split(' ').slice(0, 15).join(' ') + (article.body?.split(' ').length > 15 ? '...' : '')}
                        </p>
                        <span className="news-card-link">Baca Selengkapnya <FaArrowRight size={12} /></span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-5">
                <CustomPagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
              </div>
            )}
          </>
        )}
      </Container>
    </main>
  );
}

export default SemuaBeritaPage;
