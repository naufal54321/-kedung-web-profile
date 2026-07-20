import React from 'react';
import AgendaItem from './AgendaItem';

const AgendaList = ({ agendas, handleAgendaClick }) => {
  return (
    <div className="d-flex flex-wrap">
      {agendas.map((agenda) => (
        <div key={agenda.id} className="flex-grow-1" style={{ margin: '0 10px 10px 0' }}>
          <AgendaItem agenda={agenda} handleAgendaClick={handleAgendaClick} />
        </div>
      ))}
    </div>
  );
};

export default AgendaList;
