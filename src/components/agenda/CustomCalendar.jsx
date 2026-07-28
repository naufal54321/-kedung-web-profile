import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal } from 'react-bootstrap'
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa'
import './CustomCalendar.css'

function CustomCalendar({ agendas = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Format data agenda ke format event FullCalendar
  const events = agendas.map((agenda) => ({
    id: agenda.id,
    title: agenda.name,
    start: agenda.dateStart,
    end: agenda.dateEnd ? new Date(new Date(agenda.dateEnd).getTime() + 86400000) : agenda.dateStart, // +1 hari agar end date inclusive
    backgroundColor: getStatusColor(agenda),
    borderColor: getStatusColor(agenda),
    textColor: '#fff',
    extendedProps: {
      description: agenda.description,
      lokasi: agenda.lokasi,
      maps: agenda.maps,
      imgUrl: agenda.imgUrl,
      dateStart: agenda.dateStart,
      dateEnd: agenda.dateEnd
    }
  }))

  // Tentukan warna berdasarkan status agenda
  function getStatusColor(agenda) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = new Date(agenda.dateStart)
    start.setHours(0, 0, 0, 0)
    const end = new Date(agenda.dateEnd)
    end.setHours(0, 0, 0, 0)

    if (start > today) return '#2196F3' // Biru - Akan Datang
    if (start <= today && end >= today) return '#4CAF50' // Hijau - Berlangsung
    return '#9E9E9E' // Abu-abu - Selesai
  }

  // Format tanggal ke bahasa Indonesia
  function formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handler klik event
  const handleEventClick = (info) => {
    setSelectedEvent(info.event)
    setShowModal(true)
  }

  return (
    <>
      <div className="custom-calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale="id"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
          }}
          buttonText={{
            today: 'Hari Ini',
            month: 'Bulan'
          }}
          height="auto"
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
          }}
          noEventsText="Tidak ada agenda"
          dayMaxEvents={3}
        />
      </div>

      {/* Modal Detail Agenda */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
        className="agenda-detail-modal"
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="fw-bold">
                {selectedEvent.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-2">
              {/* Gambar jika ada */}
              {selectedEvent.extendedProps.imgUrl && (
                <div className="text-center mb-3">
                  <img
                    src={selectedEvent.extendedProps.imgUrl}
                    alt={selectedEvent.title}
                    className="rounded"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Tanggal */}
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaCalendarAlt className="text-success" />
                <div>
                  <strong>Tanggal:</strong><br />
                  <span className="text-muted">
                    {formatDate(selectedEvent.extendedProps.dateStart)}
                    {selectedEvent.extendedProps.dateEnd &&
                      selectedEvent.extendedProps.dateStart !== selectedEvent.extendedProps.dateEnd &&
                      ` - ${formatDate(selectedEvent.extendedProps.dateEnd)}`}
                  </span>
                </div>
              </div>

              {/* Lokasi */}
              {selectedEvent.extendedProps.lokasi && (
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-danger" />
                  <div>
                    <strong>Lokasi:</strong><br />
                    <span className="text-muted">{selectedEvent.extendedProps.lokasi}</span>
                  </div>
                </div>
              )}

              {/* Deskripsi */}
              {selectedEvent.extendedProps.description && (
                <div className="mt-3">
                  <strong>Deskripsi:</strong>
                  <p className="text-muted mt-1">{selectedEvent.extendedProps.description}</p>
                </div>
              )}

              {/* Google Maps if embed URL ada */}
              {selectedEvent.extendedProps.maps && (
                <div className="mt-3">
                  <strong>Lokasi di Peta:</strong>
                  <div className="ratio ratio-16x9 mt-2">
                    <iframe
                      src={selectedEvent.extendedProps.maps}
                      style={{ border: 0, borderRadius: 8 }}
                      allowFullScreen
                      loading="lazy"
                      title="Lokasi Agenda"
                    />
                  </div>
                </div>
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  )
}

export default CustomCalendar