import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../../components/LoaderCustom';

function TogaDetail() {
  const { id } = useParams();
  const [toga, setToga] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah komponen sedang memuat

  useEffect(() => {
    const fetchTogaDetail = async () => {
      try {
        const togaDetail = await api.getTogaDetail(id);
        setToga(togaDetail);
        setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
      } catch (error) {
        console.error('Error fetching toga detail:', error);
        setLoading(false); // Set loading menjadi false jika terjadi kesalahan saat memuat data
      }
    };

    fetchTogaDetail();
  }, [id]);

  if (loading) {
    return <Loader />; // Tampilkan Loader jika loading adalah true
  }

  if (!toga) {
    return <div>Data not found</div>;
  }

  return (
    <div className="container mt-4 bg-white p-4 rounded mb-4">
      <div className="row">
        <div className="col-md-6">
          <img src={toga.imgUrl} alt={toga.name} loading="lazy" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h4 className='p-2 text-center border-bottom border-success'>{toga.name}</h4>
          <ul>
            {(toga.manfaat ?? []).map((manfaat, index) => (
              <li key={index}>
                <strong>Khasiat:</strong> {manfaat.khasiat}<br />
                <strong>Cara Pengolahan:</strong> {manfaat.cara}
              </li>
            ))}
          </ul>
          <p className='bg-secondary-green p-2 rounded mx-4'><strong>Sumber Informasi:</strong> <a href={toga.sumberInformasi}>Klik disini</a></p>
        </div>
      </div>
    </div>
  );
}

export default TogaDetail;
