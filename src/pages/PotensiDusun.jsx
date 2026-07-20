import React, { useState, useEffect } from 'react';
import BreadcrumbPotensi from '../components/PotensiDusun/BreadcrumbPotensi';
import UmkmList from '../components/PotensiDusun/UmkmList';
import api from '../utils/api';
import Loader from '../components/LoaderCustom'; // Import komponen Loader
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

function PotensiDusun() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat

  useEffect(() => {
    const fetchUmkmData = async () => {
      try {
        const umkmData = await api.getAllUmkm();
        setUmkmList(umkmData);
        setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
        // Initialize AOS setelah data dimuat
        AOS.init();
      } catch (error) {
        console.error('Error fetching UMKM:', error);
        setLoading(false); // Set loading menjadi false jika terjadi kesalahan saat memuat data
      }
    };

    setTimeout(fetchUmkmData, 2000); // 6 detik
  }, []);

  return (
    <section>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 mx-4'>
        <BreadcrumbPotensi />
      </div>
      {loading ? (
        <Loader /> // Tampilkan Loader jika loading adalah true
      ) : (
        <>
          <div className='mx-4 mt-4 shadow-sm p-3 mb-2 bg-white rounded' data-aos="fade-up">
            <h2 className='text-uppercase font-weight-bold'>Potensi Dukuh</h2>
          </div>
          <div className='mx-4 mt-4 shadow-sm p-3 mb-3 bg-white rounded' data-aos="fade-down">
            <UmkmList umkmList={umkmList} />
          </div>
        </>
      )}
    </section>
  );
}

export default PotensiDusun;
