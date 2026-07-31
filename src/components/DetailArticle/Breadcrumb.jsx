import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbDetailArticle({ articleTitle }) {
  return (
    <Breadcrumb className="breadcrumb-modern">
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item href='/'>Artikel</Breadcrumb.Item>
      <Breadcrumb.Item active>{articleTitle || 'Detail Artikel'}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbDetailArticle;
