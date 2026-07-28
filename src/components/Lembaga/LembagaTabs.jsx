import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Spinner } from 'react-bootstrap';

function LembagaTabs({ lembagas, loading }) {
  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" variant="success" /></div>
  }

  if (!lembagas || lembagas.length === 0) {
    return <p className="text-center text-muted">Belum ada data lembaga.</p>
  }

  return (
    <Tabs
      defaultActiveKey={lembagas[0]?.id}
      id="lembaga-tabs"
      className="mb-3 mx-4"
      fill
    >
      {lembagas.map((lembaga) => (
        <Tab key={lembaga.id} eventKey={lembaga.id} title={lembaga.name} className="p-4">
          <div className="mx-auto d-flex justify-content-center p-4">
            {lembaga.imgUrl ? (
              <img className="img-fluid rounded mb-5" src={lembaga.imgUrl} alt={`Struktur ${lembaga.name}`} />
            ) : (
              <p className="text-muted">Belum ada gambar struktur</p>
            )}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}

export default LembagaTabs;
