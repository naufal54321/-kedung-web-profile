import React, { useEffect, useState } from 'react';
import OrganizationChart from '../components/Struktur/OrganizationChart';
import Breadcrumb from '../components/Struktur/Breadcrumb';
import api from '../utils/api';
import Loader from '../components/LoaderCustom'; // Import komponen Loader
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

function StrukturPemerintahan() {
  const [strukturs, setStrukturs] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAllStrukturs();
        setStrukturs(response);
        setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
      } catch (error) {
        console.error('Error fetching strukturs:', error);
        setLoading(false); // Set loading menjadi false jika terjadi kesalahan saat memuat data
      }
    };

    setTimeout(fetchData, 2000); // 6 detik
  }, []);

  useEffect(() => {
    // Initialize AOS setelah data dimuat
    if (!loading) {
      AOS.init();
    }
  }, [loading]);

  return (
    <section className='poppins-medium'>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 mx-4'>
        <Breadcrumb />
      </div>
      {loading ? (
        <Loader /> // Tampilkan Loader jika loading adalah true
      ) : (
        <>
          <div className='bg-white p-4 rounded mt-2 mx-4 mb-3' data-aos="fade-up"> {/* Tambahkan data-aos di sini */}
            <h4>Struktur Pemerintahan</h4>
          </div>
          <div className='bg-white p-4 rounded mt-2 mx-4 mb-3' data-aos="fade-down"> {/* Tambahkan data-aos di sini */}
            <OrganizationChart data={strukturs} />
          </div>
        </>
      )}
    </section>
  );
}

export default StrukturPemerintahan;
