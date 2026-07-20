// HayatiList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import NonHayatiItem from './NonHayatiItem';

const NonHayatiList = () => {
  const [nonhayatis, setNonHayatis] = useState([]);

  useEffect(() => {
    // Mengambil data hayati dari API saat komponen dimuat
    async function fetchNonHayatis() {
      try {
        const nonhayatisData = await api.getAllNonHayatis(); // Panggil fungsi getAllHayatis dari modul API
        setNonHayatis(nonhayatisData); // Set state dengan data hayati yang diperoleh dari API
      } catch (error) {
        console.error('Error fetching nonhayatis:', error);
      }
    }

    fetchNonHayatis(); // Panggil fungsi fetchHayatis
  }, []);

  return (
    <div className="container">
      <div className="row">
        {nonhayatis.map((nonhayati) => (
          <NonHayatiItem key={nonhayati.id} nonhayati={nonhayati} />
        ))}
      </div>
    </div>
  );
};

export default NonHayatiList;
