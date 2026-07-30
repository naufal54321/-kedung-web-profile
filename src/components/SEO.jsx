import { Helmet } from 'react-helmet-async';

const defaultTitle = 'Padukuhan Kedung — Website Resmi';
const defaultDesc = 'Website resmi Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta.';
const defaultImage = 'https://kedung-guwosari.vercel.app/img/carousel/slide-1.jpeg';
const siteUrl = 'https://kedung-guwosari.vercel.app';

function SEO({ title, description, image, url }) {
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDesc = description || defaultDesc;
  const pageImage = image || defaultImage;
  const pageUrl = url || siteUrl;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="google-site-verification" content="Wr73F-3OXjSBvXhsJELY5pCUJjJhA7EO1O2ozdsIVyo" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
      <link rel="canonical" href={pageUrl} />
    </Helmet>
  );
}

export default SEO;
