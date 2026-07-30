import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Spinner, Nav } from 'react-bootstrap';
import { FaCalendarAlt, FaList } from 'react-icons/fa';
import AgendaList from '../components/agenda/AgendaList';
import CustomCalendar from '../components/agenda/CustomCalendar'; // ✅ Import baru
import api from '../utils/api';
import CustomPagination from '../components/agenda/CustomPagination';
import ProfilHero from '../components/Profil/ProfilHero';
import ProfilCard from '../components/Profil/ProfilCard';
import SEO from '../components/SEO';

const AgendaPage = () => {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('semua');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const fetchedAgendas = await api.getAllAgendas();
        setAgendas(fetchedAgendas);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agendas:', error);
        setLoading(false);
      }
    };
    fetchAgendas();
  }, []);

  const today = new Date();
  const filteredAgendas = agendas.filter((a) => {
    if (filter === 'semua') return true;
    if (filter === 'akan-datang') return new Date(a.dateEnd) >= today && new Date(a.dateStart) > today;
    if (filter === 'berlangsung') return new Date(a.dateStart) <= today && new Date(a.dateEnd) >= today;
    if (filter === 'selesai') return new Date(a.dateEnd) < today;
    return true;
  });

  const sorted = [...filteredAgendas].sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="profil-page">
      <SEO title="Agenda" description="Jadwal kegiatan dan acara di Padukuhan Kedung" />
      <ProfilHero title="Agenda" subtitle="Jadwal kegiatan dan acara di Padukuhan Kedung" />

      <Container className="py-4">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3" data-aos="fade-up">
          <Nav variant="pills" className="gap-1">
            <Nav.Item>
              <Nav.Link active={filter === 'semua'} onClick={() => { setFilter('semua'); setCurrentPage(1); }}
                className={filter === 'semua' ? 'bg-success text-white' : 'text-dark bg-white'}>
                Semua
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={filter === 'akan-datang'} onClick={() => { setFilter('akan-datang'); setCurrentPage(1); }}
                className={filter === 'akan-datang' ? 'bg-success text-white' : 'text-dark bg-white'}>
                Akan Datang
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={filter === 'berlangsung'} onClick={() => { setFilter('berlangsung'); setCurrentPage(1); }}
                className={filter === 'berlangsung' ? 'bg-success text-white' : 'text-dark bg-white'}>
                Berlangsung
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={filter === 'selesai'} onClick={() => { setFilter('selesai'); setCurrentPage(1); }}
                className={filter === 'selesai' ? 'bg-success text-white' : 'text-dark bg-white'}>
                Selesai
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            {loading ? (
              <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="success" /></div>
            ) : currentItems.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <FaList size={40} className="mb-3 opacity-50" />
                <p>Tidak ada agenda {filter !== 'semua' ? 'dengan status ini' : ''}</p>
              </div>
            ) : (
              <>
                <AgendaList agendas={currentItems} />
                {sorted.length > itemsPerPage && (
                  <div className="mt-4">
                    <CustomPagination currentPage={currentPage} totalPages={Math.ceil(sorted.length / itemsPerPage)} paginate={paginate} />
                  </div>
                )}
              </>
            )}
          </Col>
          <Col lg={4}>
            {/* ✅ Kalender Kustom pengganti Google Calendar */}
            <ProfilCard>
              <h5 className="profil-card-title">
                <FaCalendarAlt className="me-2" />
                Kalender Agenda
              </h5>
              {loading ? (
                <div className="d-flex justify-content-center py-4">
                  <Spinner animation="border" variant="success" size="sm" />
                </div>
              ) : (
                <CustomCalendar agendas={agendas} />
              )}
            </ProfilCard>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AgendaPage;