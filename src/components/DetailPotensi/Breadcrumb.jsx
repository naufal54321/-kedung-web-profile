import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbDetailUmkm({ umkmId }) {
  return (
    <Breadcrumb className='ml-15px '>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Potensi Dukuh</Breadcrumb.Item>
      <Breadcrumb.Item active>{umkmId}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbDetailUmkm;
