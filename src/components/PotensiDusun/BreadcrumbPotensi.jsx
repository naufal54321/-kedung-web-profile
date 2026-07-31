import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbPotensi() {
  return (
    <Breadcrumb className='ml-15px'>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Potensi Dusun</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbPotensi;