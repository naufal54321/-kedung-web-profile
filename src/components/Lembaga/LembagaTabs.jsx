import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function LembagaTabs({ lembagas, loading }) {
  if (loading) {
    return (
      <div className="d-flex flex-wrap justify-content-center gap-4 py-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton-card-lg" style={{ width: '100%', maxWidth: 320, padding: '1.75rem' }}>
            <div className="skeleton skeleton-line w-40 mx-auto mb-4" />
            <div className="skeleton mx-auto mb-3" style={{ width: 260, height: 180 }} />
            <div className="skeleton skeleton-line w-80 mx-auto" />
          </div>
        ))}
      </div>
    );
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
              <img className="img-fluid rounded mb-5" src={lembaga.imgUrl} alt={`Struktur ${lembaga.name}`} loading="lazy" decoding="async" />
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
