import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaWhatsapp, FaFacebookF, FaLink, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import ImagePreview from '../ImagePreview';
import { waShareUrl } from '../../utils/share';

const readingTime = (text = '') => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));

const ArticleProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="article-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
};

const ArticleDetail = ({ article, previous, next }) => {
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const paragraphs = article?.body?.split(/\s\s+/) || [];
  const middleIndex = Math.floor(paragraphs.length / 2);
  const shareUrl = window.location.href;
  const shareText = `${article?.title} — Padukuhan Kedung`;
  const waShare = waShareUrl(`${shareText} ${shareUrl}`);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <ArticleProgress />
      <article className="article-detail">
        {article?.imgUrl && (
          <div className="detail-hero" onClick={() => setPreview({ url: article.imgUrl, title: article.title })}>
            <img src={article.imgUrl} alt={article.title} loading="eager" decoding="async" />
          </div>
        )}

        <div className="detail-content">
          <span className="detail-badge">{article?.category || 'Berita'}</span>
          <h1 className="detail-title">{article?.title}</h1>

          <div className="detail-meta">
            <span><FaUser /> {article?.author}</span>
            <span className="meta-separator">•</span>
            <span><FaCalendarAlt /> {formatDate(article?.publishDate)}</span>
            <span className="meta-separator">•</span>
            <span><FaClock /> {readingTime(article?.body)} menit baca</span>
          </div>

          <div className="detail-divider" />

          <div className="detail-body">
            {paragraphs.map((paragraph, index) => (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                {index === middleIndex && article?.additionalImgUrl && (
                  <div
                    className="detail-image-embed"
                    onClick={() => setPreview({ url: article.additionalImgUrl, title: 'Gambar tambahan' })}
                  >
                    <img src={article.additionalImgUrl} alt="Gambar tambahan" loading="lazy" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="detail-share">
            <span className="detail-share-label">Bagikan:</span>
            <a
              className="share-btn share-btn-wa"
              href={waShare}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bagikan ke WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              className="share-btn share-btn-fb"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bagikan ke Facebook"
            >
              <FaFacebookF />
            </a>
            <button className="share-btn share-btn-link" onClick={copyLink} aria-label="Salin tautan">
              {copied ? <FaCheck /> : <FaLink />}
            </button>
            {copied && <span className="share-copied">Disalin!</span>}
          </div>

          {(previous || next) && (
            <div className="article-prev-next">
              {previous && (
                <a className="prev-next-card" href={`/detail-Article/${previous.id}`}>
                  <FaChevronLeft />
                  <div className="prev-next-info">
                    <span className="prev-next-label">Artikel Sebelumnya</span>
                    <span className="prev-next-title">{previous.title}</span>
                  </div>
                </a>
              )}
              {next && (
                <a className="prev-next-card prev-next-next" href={`/detail-Article/${next.id}`}>
                  <div className="prev-next-info">
                    <span className="prev-next-label">Artikel Berikutnya</span>
                    <span className="prev-next-title">{next.title}</span>
                  </div>
                  <FaChevronRight />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
      <ImagePreview show={Boolean(preview)} imageUrl={preview?.url} title={preview?.title} onClose={() => setPreview(null)} />
    </>
  );
};

export default ArticleDetail;
