import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbDetailArticle({ articleId }) {
  return (
    <Breadcrumb className='ml-15px'>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Artikel</Breadcrumb.Item>
      <Breadcrumb.Item active>{articleId}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbDetailArticle;
