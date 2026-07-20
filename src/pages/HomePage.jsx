import React, { useState, useEffect } from 'react';
import CarouselCustom from '../components/Carousel';
import DeveloperCard from '../components/Home/DeveloperList';
import ArticleList from '../components/Home/ArticleList';
import api from '../utils/api';
import WartaWebsitePreview from '../components/Home/WartaWebsitePreview';
import AlmaAtaWebPreview from '../components/Home/AlmaAtaWebPreview';
import PopulationChart from '../components/Home/PendudukGrafik';
import KedungList from '../components/Home/KedungList';
import Loader from '../components/LoaderCustom'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS
import LocationInfo from '../components/Home/LocationInfo';
import ExploreCard from '../components/Home/ExploreCard';

function HomePage() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchArticles();
    }, 6000);
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.init();
    }
  }, [loading]);

  const fetchArticles = async () => {
    try {
      const articlesObj = await api.getAllArticles();
      const articles = Object.values(articlesObj).map(article => ({
        ...article,
        id: article.id,
      }));
      setArticles(articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  return (
    <div className='bg-grey-custom poppins-medium'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CarouselCustom />
          <div className='mt-4 p-4 mb-5' data-aos="fade-up">
            <LocationInfo />
          </div>
          <div className='mt-4 p-4' data-aos="fade-up">
            <ExploreCard />
          </div>
          <div className='container mt-4' id='main-content'>
            <div className='row'>
              <div className='col-lg-8 mb-4 d-flex flex-column' id='artikel' data-aos="fade-up">
                <div className='shadow-sm p-3 bg-white rounded' style={{ flex: 1 }}>
                  <h2 className='mx-4 font-primary-green text-uppercase font-weight-bold'>Berita Terkini</h2>
                  <p className='mx-4'>Tanggal dan Waktu Hari Ini: {currentDateTime}</p>
                  <div style={{ overflowY: 'auto' }}>
                    <ArticleList articles={articles} />
                  </div>
                </div>
              </div>
              <div className='col-lg-4 mb-4 p-0 d-flex flex-column' data-aos="fade-up">
                <div className='shadow-sm p-0 rounded mb-4' style={{ flex: 1 }}>
                  <PopulationChart />
                </div>
                <div className='shadow-sm p-0 rounded mb-4' style={{ flex: 1 }}>
                  <AlmaAtaWebPreview />
                </div>
                <div className='shadow-sm p-0 rounded' style={{ flex: 1 }}>
                  <WartaWebsitePreview />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 mb-4' data-aos="fade-up">
                <div className='shadow-sm p-3 bg-white rounded'>
                  <h2 className='text-center text-uppercase font-weight-bold'>Data dan Peta Lokasi</h2>
                  <div className="container p-4 bg-white">
                    <div className="row">
                      <div className="col-md-12">
                        <KedungList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 mb-4' data-aos="fade-up"> {/* Tambahkan data-aos di sini */}
                <div className='shadow-sm p-3 bg-white rounded'>
                  <h2 className='text-center text-uppercase font-weight-bold' id='about-developer'>Tentang Developer</h2>
                  <p className='text-center'>Mari kenal dengan para Developer kami ?!</p>
                  <DeveloperCard />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
