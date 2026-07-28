import React, { useState, useEffect } from 'react';
import ArticleDetail from '../components/DetailArticle/ArticleDetail';
import ArticleList from '../components/DetailArticle/ArticleList';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BreadcrumbDetailArticle from '../components/DetailArticle/Breadcrumb';
import AgendaList from '../components/agenda/AgendaList';
import CustomPagination from '../components/agenda/CustomPagination';

const DetailArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await api.getAllArticles();
        setArticles(articlesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    const fetchAgendas = async () => {
      try {
        const fetchedAgendas = await api.getAllAgendas();
        setAgendas(fetchedAgendas);
      } catch (error) {
        console.error('Error fetching agendas:', error);
      }
    };

    fetchArticles();
    fetchAgendas();
  }, []);

  const article = articles.find((a) => a.id.toString() === id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = agendas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!article) {
    return (
      <Container className="text-center py-5">
        <h4 className="text-muted">Artikel tidak ditemukan</h4>
      </Container>
    );
  }

  return (
    <main className="detail-page">
      <Container>
        <div className="detail-breadcrumb" data-aos="fade-up">
          <BreadcrumbDetailArticle articleTitle={article.title} />
        </div>
        <Row>
          <Col lg={8} data-aos="fade-up">
            <ArticleDetail article={article} />
          </Col>
          <Col lg={4} data-aos="fade-up" data-aos-delay="100">
            <div className="sidebar-wrapper">
              <div className="sidebar-section">
                <h5 className="sidebar-title">Artikel Lainnya</h5>
                <ArticleList articles={articles} />
              </div>
              <div className="sidebar-section">
                <h5 className="sidebar-title">Daftar Agenda Terkait</h5>
                <AgendaList agendas={currentItems} />
                <CustomPagination currentPage={currentPage} totalPages={Math.ceil(agendas.length / itemsPerPage)} paginate={paginate} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default DetailArticlePage;
