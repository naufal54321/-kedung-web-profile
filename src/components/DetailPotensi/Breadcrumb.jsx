import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbDetailUmkm({ umkmName }) {
  return (
    <Breadcrumb className="breadcrumb-modern">
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item href='/Potensi-Dukuh'>Potensi Dukuh</Breadcrumb.Item>
      <Breadcrumb.Item active>{umkmName || 'Detail UMKM'}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbDetailUmkm;
