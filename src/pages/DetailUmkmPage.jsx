import React, { useState, useEffect } from 'react';
import UmkmDetail from '../components/DetailPotensi/UmkmDetail';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Container, Spinner } from 'react-bootstrap';
import BreadcrumbDetailUmkm from '../components/DetailPotensi/Breadcrumb';
import SEO from '../components/SEO';

const DetailUmkmPage = () => {
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        const umkmData = await api.getUmkmDetail(id);
        setUmkm(umkmData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching umkm detail:', error);
        setLoading(false);
      }
    };
    fetchUmkm();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!umkm) {
    return (
      <Container className="text-center py-5">
        <h4 className="text-muted">UMKM tidak ditemukan</h4>
      </Container>
    );
  }

  return (
    <main className="detail-page">
      <SEO />
      <Container>
        <div className="detail-breadcrumb" data-aos="fade-up">
          <BreadcrumbDetailUmkm umkmName={umkm.name} />
        </div>
        <UmkmDetail umkm={umkm} />
      </Container>
    </main>
  );
};

export default DetailUmkmPage;
