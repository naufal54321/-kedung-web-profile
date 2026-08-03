import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';

const ArticleDetail = ({ article }) => {
  const paragraphs = article?.body?.split(/\s\s+/) || [];
  const middleIndex = Math.floor(paragraphs.length / 2);

  return (
    <article className="article-detail">
      <div className="detail-hero">
        <img src={article?.imgUrl} alt={article?.title} loading="eager" decoding="async" />
      </div>

      <div className="detail-content">
        <h1 className="detail-title">{article?.title}</h1>

        <div className="detail-meta">
          <span><FaUser /> {article?.author}</span>
          <span className="meta-separator">|</span>
          <span><FaCalendarAlt /> {formatDate(article?.publishDate)}</span>
        </div>

        <div className="detail-divider" />

        <div className="detail-body">
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              {index === middleIndex && article?.additionalImgUrl && (
                <div className="detail-image-embed">
                  <img src={article.additionalImgUrl} alt="Gambar tambahan" loading="lazy" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
