import React, { useState, useEffect } from 'react';
import UmkmDetail from '../components/DetailPotensi/UmkmDetail';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Row, Col } from 'react-bootstrap';
import BreadcrumbDetailUmkm from '../components/DetailPotensi/Breadcrumb';
import Loader from '../components/LoaderCustom'; // Import komponen Loader

const DetailUmkmPage = () => {
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat
  const { id } = useParams();

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        const umkmData = await api.getUmkmDetail(id);
        setUmkm(umkmData);
        setLoading(false); // Set loading menjadi false setelah data detail berhasil dimuat
      } catch (error) {
        console.error('Error fetching umkm detail:', error);
        setLoading(false); // Set loading menjadi false jika terjadi kesalahan saat memuat data
      }
    };

    setTimeout(fetchUmkm, 2000); // Tambahkan setTimeout untuk menunda pemanggilan fetchUmkm selama 6 detik
  }, [id]);

  return (
    <section className='mx-4'>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3'>
        <BreadcrumbDetailUmkm umkmId={id} />
      </div>
      {/* Tampilkan Loader jika loading adalah true */}
      {loading ? (
        <Loader />
      ) : (
        umkm && <UmkmDetail umkm={umkm} />
      )}
    </section>
  );
};

export default DetailUmkmPage;
