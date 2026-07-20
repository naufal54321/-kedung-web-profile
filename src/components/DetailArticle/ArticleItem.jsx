import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ArticleItem = ({ article }) => {
  const truncatedDescription = article.body.split(' ').slice(0, 10).join(' ');
  const description = truncatedDescription + (article.body.split(' ').length > 10 ? '...' : '');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <Card className="mb-4 shadow custom-font">
      <Card.Body>
        <Card.Title className='custom-font'>{article.title}</Card.Title>
        <div className="d-flex align-items-center mb-2">
          <FaUser className="mr-2 icon-space" />
          <p className="mb-0">{article.author}</p>
          <div className="flex-fill"></div>
          <FaCalendarAlt className="mr-2 icon-space" />
          <p className="mb-0">{formatDate(article.publishDate)}</p>
        </div>
        <Link to={`/detail-Article/${article.id}`} className="btn btn-success">Read More</Link>
      </Card.Body>
    </Card>
  );
};

export default ArticleItem;
