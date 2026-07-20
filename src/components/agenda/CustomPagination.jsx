import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ currentPage, totalPages, paginate }) => {
  const items = [];

  const addItem = (pageNumber) => {
    items.push(
      <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => paginate(pageNumber)}>
        {pageNumber}
      </Pagination.Item>
    );
  };

  items.push(
    <Pagination.First key="first" onClick={() => paginate(1)} disabled={currentPage === 1} />
  );

  items.push(
    <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
  );

  if (currentPage > 3) {
    addItem(1);
    if (currentPage > 4) {
      items.push(<Pagination.Ellipsis key="first-ellipsis" />);
    }
  }

  if (currentPage > 2) {
    addItem(currentPage - 2);
  }

  if (currentPage > 1) {
    addItem(currentPage - 1);
  }

  addItem(currentPage);

  if (currentPage < totalPages) {
    addItem(currentPage + 1);
  }

  if (currentPage < totalPages - 1) {
    addItem(currentPage + 2);
  }

  if (currentPage < totalPages - 2) {
    items.push(<Pagination.Ellipsis key="last-ellipsis" />);
  }

  items.push(
    <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
  );

  items.push(
    <Pagination.Last key="last" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
  );

  return <Pagination className="justify-content-center">{items}</Pagination>;
};

export default CustomPagination;
