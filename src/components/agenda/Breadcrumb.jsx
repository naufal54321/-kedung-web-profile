import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbDetailAgenda({ agendaId }) {
  return (
    <Breadcrumb className='ml-15px'>
      <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Agenda</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbDetailAgenda;
