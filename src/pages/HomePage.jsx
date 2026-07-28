import React, { useState, useEffect } from 'react';
import CarouselCustom from '../components/Carousel';
import DeveloperCard from '../components/Home/DeveloperList';
import ArticleList from '../components/Home/ArticleList';
import api from '../utils/api';
import KedungList from '../components/Home/KedungList';
import Loader from '../components/LoaderCustom'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import LocationInfo from '../components/Home/LocationInfo';
import ExploreCard from '../components/Home/ExploreCard';
import AgendaList from '../components/agenda/AgendaList';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await api.getAllArticles();
        setArticles(articlesData);
        const agendasData = await api.getAllAgendas();
        const sorted = agendasData
          .filter(a => new Date(a.dateEnd) >= new Date())
          .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
        setAgendas(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
      AOS.init();
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-grey-custom" style={{ minHeight: '100vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className='bg-grey-custom poppins-medium'>
      <CarouselCustom />
      
      <div className='mt-4 mb-5' data-aos="fade-up">
        <LocationInfo />
      </div>

      <div className='explore-section mb-5' data-aos="fade-up">
        <ExploreCard />
      </div>

      <div className='container' id='main-content'>
        <div className='row g-4'>
          <div className='col-lg-8' data-aos="fade-up">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Berita Terkini</h2>
                <Link to="/Semua-Berita" className="section-link">
                  Lihat Semua <FaArrowRight size={12} />
                </Link>
              </div>
              <ArticleList articles={articles} />
            </div>
          </div>

          <div className='col-lg-4' data-aos="fade-up" data-aos-delay="100">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Agenda Terbaru</h2>
                <Link to="/Agenda" className="section-link">
                  Lihat Semua <FaArrowRight size={12} />
                </Link>
              </div>
              {agendas.length > 0 ? (
                agendas.map(agenda => (
                  <div key={agenda.id} className="sidebar-agenda-item">
                    <div className="sidebar-agenda-date">
                      <span className="sidebar-agenda-day">
                        {new Date(agenda.dateStart).getDate()}
                      </span>
                      <span className="sidebar-agenda-month">
                        {new Date(agenda.dateStart).toLocaleDateString('id-ID', { month: 'short' })}
                      </span>
                    </div>
                    <div className="sidebar-agenda-info">
                      <h6 className="sidebar-agenda-name">{agenda.name}</h6>
                      <span className="sidebar-agenda-status">
                        {new Date(agenda.dateEnd) < new Date() ? 'Selesai' :
                         new Date(agenda.dateStart) <= new Date() ? 'Berlangsung' : 'Akan Datang'}
                      </span>
                    </div>
                    <FaCalendarAlt className="sidebar-agenda-icon" />
                  </div>
                ))
              ) : (
                <p className="text-muted text-center mb-0">Belum ada agenda terbaru</p>
              )}
            </div>
          </div>
        </div>

        <div className='row mt-4' data-aos="fade-up">
          <div className="col-12">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Data dan Peta Lokasi</h2>
              </div>
              <KedungList />
            </div>
          </div>
        </div>

        <div className='row mt-4 mb-5' data-aos="fade-up">
          <div className="col-12">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title" id='about-developer'>Tentang Developer</h2>
              </div>
              <p className="section-subtitle">Mari kenal dengan para Developer kami</p>
              <DeveloperCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
