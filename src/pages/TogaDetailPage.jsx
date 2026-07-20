import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TogaDetail from '../components/Hayati/TogaDetail';
import BreadcrumbToga from '../components/Hayati/BreadcrumbToga';
import Loader from '../components/LoaderCustom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function TogaDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
      // Initialize AOS setelah data dimuat
      AOS.init();
    }, 6000); // 6 detik
  }, []);

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 mx-4' data-aos="zoom-in-left">
            <BreadcrumbToga togaId={id} />
          </div>
          <h3 className='bg-white mx-4 p-4 rounded text-center' data-aos="zoom-in-left">Detail Tanaman</h3>
          <TogaDetail />
        </>
      )}
    </section>
  );
}

export default TogaDetailPage;
