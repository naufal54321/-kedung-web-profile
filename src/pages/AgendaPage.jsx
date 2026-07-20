import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import AgendaList from '../components/agenda/AgendaList';
import api from '../utils/api';
import BreadcrumbDetailAgenda from '../components/agenda/Breadcrumb';
import CustomPagination from '../components/agenda/CustomPagination';
import Loader from '../components/LoaderCustom'; // Import komponen Loader
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS untuk AOS

const AgendaPage = () => {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk menunjukkan apakah halaman sedang memuat
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to show per page

  useEffect(() => {
    const fetchAgendas = async () => {
      setTimeout(async () => { // Tambahkan setTimeout untuk menunda pemanggilan fetchAgendas selama 6 detik
        try {
          const fetchedAgendas = await api.getAllAgendas();
          setAgendas(fetchedAgendas);
          setLoading(false); // Set loading menjadi false setelah data dimuat
          // Initialize AOS setelah data dimuat
          AOS.init();
        } catch (error) {
          console.error('Error fetching agendas:', error);
          setLoading(false); // Set loading menjadi false jika terjadi kesalahan saat memuat data
        }
      }, 6000); // 6 detik
    };

    fetchAgendas();
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = agendas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section>
      <div className='shadow-sm p-2 mb-3 bg-breadcrumb-custom mt-3 nav-margin mx-4' data-aos="zoom-out">
        <BreadcrumbDetailAgenda />
      </div>
      <div>
        <div className='bg-white mx-4 p-3 rounded text-center'><h3>Agenda</h3></div>
      </div>
      <Container>
        {loading ? (
          <Loader /> // Tampilkan loader jika loading adalah true
        ) : (
          <>
            <Row className='mt-3'>
              <Col md={6} lg={4} className='mx-md-auto mx-lg-4 p-2 rounded' data-aos="zoom-in">
                <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                  <AgendaList agendas={currentItems} />
                </div>
                <CustomPagination currentPage={currentPage} totalPages={Math.ceil(agendas.length / itemsPerPage)} paginate={paginate} />
              </Col>
              <Col md={6} lg={2} className='p-2 rounded mx-md-auto mx-lg-4' data-aos="zoom-in">
                <section className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item calendar-custom bg-white rounded p-4" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&bgcolor=%2333B679&src=cGFkdWt1aGFua2VkdW5nQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=aWQuaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%2333B679&color=%230B8043"></iframe>
                </section>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  );
};

export default AgendaPage;
