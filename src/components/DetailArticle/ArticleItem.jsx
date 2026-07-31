import { FaUser, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const ArticleItem = ({ article }) => {
  return (
    <div className="sidebar-article-item">
      <Link to={`/detail-Article/${article?.id}`} className="sidebar-article-link">
        <div className="sidebar-article-img">
          <img src={article?.imgUrl} alt={article?.title} loading="lazy" />
        </div>
        <div className="sidebar-article-body">
          <h6 className="sidebar-article-title">{article?.title}</h6>
          <div className="sidebar-article-meta">
            <span><FaUser size={10} /> {article?.author}</span>
            <span><FaCalendarAlt size={10} /> {formatDate(article?.publishDate)}</span>
          </div>
          <span className="sidebar-article-read">Baca <FaArrowRight size={10} /></span>
        </div>
      </Link>
    </div>
  );
};

export default ArticleItem;
