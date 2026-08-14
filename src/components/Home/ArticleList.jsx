import { useState } from 'react';
import ArticleItem from './ArticleItem';
import CustomPagination from '../CustomPagination';

const ArticleList = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const sortedArticles = [...articles].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));

  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="row g-4">
        {currentArticles.map((article, index) => (
          <div key={article.id} className="col-md-6">
            <ArticleItem article={article} index={index} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <CustomPagination currentPage={currentPage} totalPages={Math.ceil(articles.length / articlesPerPage)} paginate={paginate} />
      </div>
    </div>
  );
};

export default ArticleList;
