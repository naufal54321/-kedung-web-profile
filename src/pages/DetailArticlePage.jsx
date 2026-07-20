import React, { useState, useEffect } from 'react';
import ArticleDetail from '../components/DetailArticle/ArticleDetail';
import ArticleList from '../components/DetailArticle/ArticleList';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Container, Row, Col } from 'react-bootstrap';
import BreadcrumbDetailArticle from '../components/DetailArticle/Breadcrumb';
import Loader from '../components/LoaderCustom';
import AgendaList from '../components/agenda/AgendaList';
import CustomPagination from '../components/agenda/CustomPagination';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        AOS.init();
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

  const article = articles.find((article) => article.id.toString() === id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = agendas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 nav-margin mx-4' data-aos="fade-up">
        <BreadcrumbDetailArticle articleId={id} />
      </div>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col lg={8} md={12} data-aos="zoom-out">
              <div className="article-detail">
                {article && <ArticleDetail article={article} />}
              </div>
            </Col>
            <Col lg={4} md={12} data-aos="zoom-in">
              <Row>
                <Col md={12}>
                  <div className="article-list">
                    <h4 className='text-center bg-white p-2 rounded mt-3 mx-3'>Artikel Lainnya</h4>
                    <ArticleList articles={articles} />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="agenda-list mx-2">
                    <h4 className='text-center bg-white p-2 rounded mt-3'>Daftar Agenda Terkait</h4>
                    <AgendaList agendas={currentItems} />
                    <CustomPagination currentPage={currentPage} totalPages={Math.ceil(agendas.length / itemsPerPage)} paginate={paginate} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default DetailArticlePage;
