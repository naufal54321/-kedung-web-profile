import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function AdminChart({ type, data, options, height = 250 }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } }
    },
    scales: type === 'bar' ? {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { font: { size: 11 } } }
    } : undefined,
    cutout: type === 'doughnut' ? '65%' : undefined,
    ...options
  };

  const ChartComponent = type === 'doughnut' ? Doughnut : Bar;

  return (
    <div style={{ height }}>
      <ChartComponent data={data} options={defaultOptions} />
    </div>
  );
}

export default AdminChart;
