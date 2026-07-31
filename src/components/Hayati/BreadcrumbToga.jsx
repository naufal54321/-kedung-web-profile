import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbToga({ togaId }) {
  return (
    <Breadcrumb className='ml-15px'>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Profil Dusun</Breadcrumb.Item>
      <Breadcrumb.Item href='/Hayati-NonHayati'>Hayati dan Non Hayati</Breadcrumb.Item>
      <Breadcrumb.Item active>Toga</Breadcrumb.Item>
      <Breadcrumb.Item active>{`${togaId}`}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbToga;
