import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbHayati() {
  return (
    <Breadcrumb className='ml-15px'>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Lembaga Masyarakat</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbHayati;