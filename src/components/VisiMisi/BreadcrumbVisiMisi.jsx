import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbVisiMisi() {
  return (
    <Breadcrumb className='ml-15px'>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Profil Dusun</Breadcrumb.Item>
      <Breadcrumb.Item active>Visi & Misi</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbVisiMisi;