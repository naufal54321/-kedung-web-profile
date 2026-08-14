import { useState } from 'react';
import ArticleItem from './ArticleItem';
import CustomPagination from '../CustomPagination';

const ArticleList = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Menghitung indeks awal dan akhir artikel untuk halaman saat ini
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  
  // Mengurutkan artikel berdasarkan tanggal publish date
  const sortedArticles = [...articles].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));

  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="row">
        {currentArticles.map((article) => (
          <div key={article.id} className="col-md-12">
            <ArticleItem article={article} />
          </div>
        ))}
      </div>
      <CustomPagination currentPage={currentPage} totalPages={Math.ceil(articles.length / articlesPerPage)} paginate={paginate} />
    </div>
  );
};

export default ArticleList;
