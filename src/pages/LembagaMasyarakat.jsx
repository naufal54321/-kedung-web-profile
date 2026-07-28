import React, { useState, useEffect } from 'react';
import LembagaTabs from '../components/Lembaga/LembagaTabs';
import api from '../utils/api';
import ProfilHero from '../components/Profil/ProfilHero';
import ProfilCard from '../components/Profil/ProfilCard';

function LembagaMasyarakat() {
  const [lembagas, setLembagas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getAllLembagas()
        setLembagas(data)
      } catch (error) {
        console.error('Error fetching lembagas:', error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <main className="profil-page">
      <ProfilHero
        title="Lembaga Masyarakat"
        subtitle="Organisasi dan kelembagaan yang ada di Padukuhan Kedung"
      />
      <div className="container py-4">
        <ProfilCard>
          <LembagaTabs lembagas={lembagas} loading={loading} />
        </ProfilCard>
    </div>
  </main>
  )
}

export default LembagaMasyarakat;
