import React, { useState } from 'react';
import UmkmItem from './UmkmItem';
import CustomPagination from './CustomPagination';

const UmkmList = ({ umkmList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const umkmsPerPage = 3;

  // Menghitung indeks awal dan akhir umkm untuk halaman saat ini
  const indexOfLastUmkm = currentPage * umkmsPerPage;
  const indexOfFirstUmkm = indexOfLastUmkm - umkmsPerPage;

  // Memotong umkm yang sesuai dengan halaman saat ini
  const currentUmkms = umkmList.slice(indexOfFirstUmkm, indexOfLastUmkm);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row">
        {currentUmkms.map((umkm) => (
          <div key={umkm.id} className="col-md-12">
            <UmkmItem umkm={umkm} />
          </div>
        ))}
      </div>
      <CustomPagination currentPage={currentPage} totalPages={Math.ceil(umkmList.length / umkmsPerPage)} paginate={paginate} />
    </div>
  );
};

export default UmkmList;
