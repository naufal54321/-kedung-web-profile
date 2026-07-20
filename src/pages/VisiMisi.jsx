import React, { useState, useEffect } from 'react';
import BreadcrumbVisiMisi from '../components/VisiMisi/BreadcrumbVisiMisi';
import CardVisiMisi from '../components/VisiMisi/CardVisiMisi';
import Loader from '../components/LoaderCustom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function VisiMisi() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.init();
    }
  }, [loading]);

  return (
    <section className='poppins-medium'>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 mx-2 ' data-aos="fade-up">
        <BreadcrumbVisiMisi />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=' bg-white p-4 rounded mt-2 mx-4 mb-3' data-aos="flip-up">
            <h2 className='text-center text-uppercase font-weight-bold p-3 mb-2 mx-4 '>Visi dan Misi</h2>
          </div>
          <div className='shadow-sm p-2 mb-3' data-aos="flip-up">
            <CardVisiMisi />
          </div>
        </>
      )}
    </section>
  );
}

export default VisiMisi;
