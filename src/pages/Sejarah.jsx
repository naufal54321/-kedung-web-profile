import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Sejarah/Breadcrumb';
import Loader from '../components/LoaderCustom'; // Import komponen Loader
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

function Sejarah() {
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat

  useEffect(() => {
    // Set timeout untuk mensimulasikan proses pengambilan data
    const timer = setTimeout(() => {
      setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
    }, 2000); // 2 detik

    // Membersihkan timeout jika komponen dibongkar sebelum data dimuat
    return () => clearTimeout(timer);
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
          <div className='bg-white p-4 rounded mt-2 mx-4 mb-3' data-aos="flip-up"> {/* Tambahkan data-aos di sini */}
            <h4>Sejarah Padukuhan</h4>
            <p className='font-custom-size mt-5'>Padukuhan kedung terletak di kalurahan guwosari kecamatan pajangan, kabupaten bantul. Padukuhan kedung memilik 4 RT. Yang terdiri dari RT 1, RT 2, RT 3 dan RT 4. Setiap RT memiliki ciri khasnya sendiri. Jumlah penduduk di padukuhan kedung tergolong ramai berdasarkan KK (Kartu Keluarga) yang ada di padukuhan kedung.</p>
          </div>
          <div className='bg-white p-4 rounded mt-2 mx-4 mb-3' data-aos="flip-up"> {/* Tambahkan data-aos di sini */}
            <h4>Sejarah Kepemimpinan</h4>
            <p className='font-custom-size mt-5'>Informasi segera menyusul</p>
          </div>
        </>
      )}
    </section>
  );
}

export default Sejarah;
