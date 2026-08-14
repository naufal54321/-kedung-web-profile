/* eslint-disable react-refresh/only-export-components */
import { Helmet } from 'react-helmet-async';

const defaultTitle = 'Padukuhan Kedung – Website Resmi';
const defaultDesc = 'Website resmi Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta.';
const defaultImage = 'https://kedung-guwosari.vercel.app/img/carousel/slide-1.webp';
const siteUrl = 'https://kedung-guwosari.vercel.app';

const pathLabels = {
  'Semua-Berita': 'Berita',
  'Potensi-Dukuh': 'Potensi Dukuh',
  'Hayati-NonHayati': 'Hayati & Non-Hayati',
  'detail-Article': 'Berita',
  'detail-Umkm': 'UMKM',
  'Toga': 'TOGA',
  'Visi-Misi': 'Visi & Misi',
  'Lembaga-Masyarakat': 'Lembaga Masyarakat',
  'Struktur-Pemerintahan': 'Struktur Pemerintahan',
  'Tentang-Developer': 'Tentang Developer',
  'Daftar-UMKM': 'Daftar UMKM',
  'Kontak': 'Kontak',
  'Agenda': 'Agenda',
  'Sejarah': 'Sejarah',
};

function buildBreadcrumb(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;
  const items = [{ '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl }];
  let current = '';
  parts.forEach((part, index) => {
    current += `/${part}`;
    const label = pathLabels[part] || part.charAt(0).toUpperCase() + part.slice(1);
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: label,
      item: `${siteUrl}${current}`,
    });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function SEO({ title, description, image, url }) {
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDesc = description || defaultDesc;
  const pageImage = image || defaultImage;
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : siteUrl);
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  const breadcrumb = typeof window !== 'undefined' ? buildBreadcrumb(window.location.pathname) : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {isAdmin ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta name="google-site-verification" content="Wr73F-3OXjSBvXhsJELY5pCUJjJhA7EO1O2ozdsIVyo" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
      <link rel="canonical" href={pageUrl} />
      {breadcrumb && (
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      )}
    </Helmet>
  );
}

export default SEO;
