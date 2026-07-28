import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import AgendaDetailModal from './AgendaDetail';

const AgendaItem = ({ agenda }) => {
  const [showModal, setShowModal] = useState(false);

  const formatDateRange = () => {
    const start = new Date(agenda.dateStart);
    const end = new Date(agenda.dateEnd);
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    const startStr = start.toLocaleDateString('id-ID', opts);
    const endStr = end.toLocaleDateString('id-ID', opts);
    return startStr === endStr ? startStr : `${startStr} - ${endStr}`;
  };

  const getStatus = () => {
    const now = new Date();
    const start = new Date(agenda.dateStart);
    const end = new Date(agenda.dateEnd);
    if (now > end) return { label: 'Selesai', class: 'status-selesai' };
    if (now >= start) return { label: 'Berlangsung', class: 'status-berlangsung' };
    return { label: 'Akan Datang', class: 'status-akan' };
  };

  const status = getStatus();

  return (
    <>
      <div className="agenda-card">
        <div className="agenda-card-image">
          <img src={agenda.imgUrl} alt={agenda.name} loading="lazy" />
          <span className={`agenda-card-status ${status.class}`}>{status.label}</span>
        </div>
        <div className="agenda-card-body">
          <h5 className="agenda-card-title">{agenda.name}</h5>
          <div className="agenda-card-info">
            <span><FaCalendarAlt size={12} /> {formatDateRange()}</span>
            {agenda.lokasi && <span><FaMapMarkerAlt size={12} /> {agenda.lokasi}</span>}
          </div>
          <button className="agenda-card-btn" onClick={() => setShowModal(true)}>
            Lihat Detail <FaArrowRight size={11} />
          </button>
        </div>
      </div>
      <AgendaDetailModal show={showModal} handleClose={() => setShowModal(false)} agenda={agenda} />
    </>
  );
};

export default AgendaItem;
