import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUser, FaCalendarAlt } from 'react-icons/fa';
import api from '../utils/api';
import { formatDate } from '../utils/formatDate';
import Pagination from 'react-bootstrap/Pagination';
import ProfilHero from '../components/Profil/ProfilHero';
import SEO from '../components/SEO';

function SemuaBeritaPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = articles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const paginate = (page) => setCurrentPage(page);

  const renderPagination = () => {
    const items = [];
    items.push(<Pagination.First key="first" onClick={() => paginate(1)} disabled={currentPage === 1} />);
    items.push(<Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />);
    if (currentPage > 3) {
      items.push(<Pagination.Item key={1} onClick={() => paginate(1)}>{1}</Pagination.Item>);
      if (currentPage > 4) items.push(<Pagination.Ellipsis key="e1" />);
    }
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      items.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>{i}</Pagination.Item>);
    }
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) items.push(<Pagination.Ellipsis key="e2" />);
      items.push(<Pagination.Item key={totalPages} onClick={() => paginate(totalPages)}>{totalPages}</Pagination.Item>);
    }
    items.push(<Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />);
    items.push(<Pagination.Last key="last" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />);
    return items;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-grey-custom" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <main className="profil-page">
      <SEO title="Berita" description="Informasi terkini seputar Padukuhan Kedung" />
      <ProfilHero title="Semua Berita" subtitle="Informasi terkini seputar Padukuhan Kedung" />
      <Container className="py-4">
        {articles.length === 0 ? (
          <p className="text-muted text-center py-5">Belum ada berita.</p>
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
              <div className="d-flex justify-content-center mt-5">
                <Pagination className="mb-0">{renderPagination()}</Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </main>
  );
}

export default SemuaBeritaPage;
