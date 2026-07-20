import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const ArticleDetail = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Memecah teks body menjadi beberapa paragraf berdasarkan tab atau spasi berlebih
  const paragraphs = article.body.split(/\s\s+/);

  // Mendapatkan indeks paragraf tengah untuk menampilkan gambar tambahan
  const middleIndex = Math.floor(paragraphs.length / 2);

  return (
    <section className='bg-white p-2 rounded mt-3 mb-3 custom-font' style={{ textAlign: 'justify' }}>
        <div className='mx-auto d-flex justify-content-center p-2'>
            <img className='img-fluid rounded' src={article.imgUrl} alt={article.title}/>
        </div>
        <h4 className='p-2'>{article.title}</h4>
        <div className="d-flex align-items-center mb-2 p-2 bg-secondary-green rounded mx-2">
          <FaUser className="mr-2 icon-space" />
          <p className="mb-0">{article.author}</p>
          <div className="flex-fill"></div>
          <FaCalendarAlt className="mr-2 icon-space" />
          <p className="mb-0">{formatDate(article.publishDate)}</p>
        </div>
        <div className='p-2'>
          {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              {/* Menampilkan gambar tambahan di tengah-tengah paragraf */}
              {index === middleIndex && article.additionalImgUrl && (
                <div className="text-center mb-2">
                  <img className="img-fluid rounded" src={article.additionalImgUrl} alt="Additional"/>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
    </section>
  );
};

export default ArticleDetail;
