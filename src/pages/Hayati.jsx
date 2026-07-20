import React, { useState, useEffect } from 'react';
import BreadcrumbHayati from '../components/Hayati/Breadcrumb';
import HayatiList from '../components/Hayati/HayatiList';
import NonHayatiList from '../components/Hayati/NonHayatiList';
import TogaList from '../components/Hayati/TogaList';
import Loader from '../components/LoaderCustom'; // Import komponen Loader
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

function Hayati() {
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
      // Initialize AOS setelah data dimuat
      AOS.init();
    }, 6000); // 6 detik
  }, []);

  return (
    <>
      {loading ? (
        <Loader /> // Tampilkan Loader jika loading adalah true
      ) : (
        <section className='poppins-medium custom-font' data-aos="fade-up"> {/* Tambahkan data-aos di sini */}
          <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 mx-4'>
            <BreadcrumbHayati />
          </div>
          <div className='bg-white p-4 rounded mt-2 mx-4 mb-3' data-aos="zoom-in-down">
            <h6>Sumber Hayati dan Non Hayati Padukuhan Kedung</h6>
            <p className=''>Padukuhan Kedung mempunyai potensi sumber daya alam hayati yang meliputi hutan, flora, dan fauna sedangkan sumber daya alam non hayati berupa bahan galian.</p>
          </div>
          <h6 className='bg-white p-4 rounded mx-4 mb-4'>1. Toga</h6>
          <div className='bg-white p-4 rounded mx-4 mb-4' data-aos="zoom-in-down">
            <TogaList />
          </div>
          <h6 className='bg-white p-4 rounded mx-4 mb-4'>2. Hayati</h6>
          <div className='bg-white p-4 rounded mx-4 mb-4' data-aos="zoom-in-down">
            <HayatiList />
          </div>
          <h6 className='bg-white p-4 rounded mx-4 mb-4'>3. Non Hayati</h6>
          <div className='bg-white p-4 rounded mx-4 mb-4' data-aos="zoom-in-down">
            <NonHayatiList />
          </div>
        </section>
      )}
    </>
  );
}

export default Hayati;
