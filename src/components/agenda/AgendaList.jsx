import AgendaItem from './AgendaItem';

const AgendaList = ({ agendas }) => {
  return (
    <div className="row g-4">
      {agendas.map((agenda) => (
        <div key={agenda.id} className="col-md-6">
          <AgendaItem agenda={agenda} />
        </div>
      ))}
    </div>
  );
};

export default AgendaList;
