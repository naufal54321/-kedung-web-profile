import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbDetailAgenda() {
  return (
    <Breadcrumb className="breadcrumb-modern">
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Agenda</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbDetailAgenda;
