import React from 'react';
import { FaUser, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const ArticleItem = ({ article, index }) => {
  const bodyText = article?.body || '';
  const truncatedDescription = bodyText.split(' ').slice(0, 15).join(' ');
  const description = truncatedDescription + (bodyText.split(' ').length > 15 ? '...' : '');

  return (
    <div className="news-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <Link to={`/detail-Article/${article?.id}`} className="text-decoration-none">
        <div className="news-card-image">
          <img src={article?.imgUrl} alt={article?.title} loading="lazy" />
          <div className="news-card-overlay" />
        </div>
        <div className="news-card-body">
          <div className="news-card-meta">
            <span><FaUser size={11} /> {article?.author}</span>
            <span><FaCalendarAlt size={11} /> {formatDate(article?.publishDate)}</span>
          </div>
          <h5 className="news-card-title">{article?.title}</h5>
          <p className="news-card-desc">{description}</p>
          <span className="news-card-link">
            Baca Selengkapnya <FaArrowRight size={12} />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ArticleItem;
