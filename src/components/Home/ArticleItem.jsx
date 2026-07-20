import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ArticleItem = ({ article }) => {
  const bodyText = article?.body || '';
  const truncatedDescription = bodyText.split(' ').slice(0, 10).join(' ');
  const description =
    truncatedDescription + (bodyText.split(' ').length > 10 ? '...' : '');

  const formatDate = (dateString) => {
    if (!dateString) return '-';

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="mb-4 shadow poppins-medium custom-font article-item border">
      <Row>
        <Col xs={12} md={4}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img
              src={article?.imgUrl}
              alt={article?.title}
              className="img-fluid rounded"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </Col>

        <Col xs={12} md={8}>
          <div className="p-3">
            <h5>
              <Link
                to={`/detail-Article/${article?.id}`}
                className="text-decoration-none text-dark article-title custom-font"
                style={{ fontWeight: 'bold' }}
              >
                {article?.title}
              </Link>
            </h5>

            <div className="d-flex align-items-center mb-4 mt-4">
              <FaUser className="mr-2 icon-space" />
              <p className="mb-0">{article?.author}</p>

              <div className="flex-fill"></div>

              <FaCalendarAlt className="mr-2 icon-space" />
              <p className="mb-0">{formatDate(article?.publishDate)}</p>
            </div>

            <p>{description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleItem;