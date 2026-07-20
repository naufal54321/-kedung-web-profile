import React, { useState, useEffect } from 'react';
import LembagaTabs from '../components/Lembaga/LembagaTabs';
import Breadcrumb from '../components/Lembaga/Breadcrumb';
import Loader from '../components/LoaderCustom'; // Import komponen Loader
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

function LembagaMasyarakat() {
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
      // Initialize AOS setelah data dimuat
      AOS.init();
    }, 2000); // 6 detik
  }, []);

  return (
    <section className='poppins-medium'>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 mx-4'>
        <Breadcrumb />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='bg-white p-4 rounded mt-2 mx-4 mb-3 text-center' data-aos="fade-up">
            <h4>Lembaga Masyarakat</h4>
          </div>
          <LembagaTabs></LembagaTabs>
        </>
      )}
    </section>
  )
}

export default LembagaMasyarakat;
