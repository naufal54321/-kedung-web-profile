import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarController, BarElement } from 'chart.js'; // Import skala linear
import api from '../../utils/api';

const PopulationChart = () => {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    // Daftarkan skala linear
    Chart.register(LinearScale, CategoryScale, BarController, BarElement);
    
    const fetchData = async () => {
      try {
        const data = await api.getDataPenduduk();
        setPopulationData(data);
      } catch (error) {
        console.error('Error fetching population data:', error);
      }
    };

    fetchData();
  }, []);

  if (!populationData) {
    return <div>Loading...</div>;
  }

  const { lelaki, perempuan, tahun, total } = populationData;

  const data = {
    labels: ['Lelaki', 'Perempuan'],
    datasets: [
      {
        label: 'Population',
        data: [lelaki, perempuan],
        backgroundColor: ['#36a2eb', '#ff6384'],
        borderColor: ['#36a2eb', '#ff6384'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='bg-white p-4 mb-3 rounded'>
      <h4 className='text-center mb-3'>Data Penduduk</h4>
      <p className='text-center'>({tahun})</p>
      <p>Total: {total}</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PopulationChart;
