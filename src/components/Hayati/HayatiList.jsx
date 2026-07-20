// HayatiList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

import HayatiItem from './HayatiItem';

const HayatiList = () => {
  const [hayatis, setHayatis] = useState([]);

  useEffect(() => {
    // Mengambil data hayati dari API saat komponen dimuat
    async function fetchHayatis() {
      try {
        const hayatisData = await api.getAllHayatis(); // Panggil fungsi getAllHayatis dari modul API
        setHayatis(hayatisData); // Set state dengan data hayati yang diperoleh dari API
      } catch (error) {
        console.error('Error fetching hayatis:', error);
      }
    }

    fetchHayatis(); // Panggil fungsi fetchHayatis
  }, []);

  return (
    <div className="container">
      <div className="row">
        {hayatis.map((hayati) => (
          <HayatiItem key={hayati.id} hayati={hayati} />
        ))}
      </div>
    </div>
  );
};

export default HayatiList;
