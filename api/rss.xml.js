/* eslint-env node */
const SITE = 'https://kedung-guwosari.vercel.app'
const BASE = process.env.VITE_FIREBASE_DATABASE_URL || 'https://kedung-api-7eaed-default-rtdb.asia-southeast1.firebasedatabase.app'

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(date) {
  const d = new Date(date)
  return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
}

export default async function handler(req, res) {
  try {
    const articles = await fetch(`${BASE}/article.json`).then(r => r.json())
    const items = []
    if (articles && typeof articles === 'object') {
      Object.entries(articles)
        .sort((a, b) => new Date(b[1].publishDate || 0) - new Date(a[1].publishDate || 0))
        .slice(0, 20)
        .forEach(([id, a]) => {
          const desc = (a.body || '').replace(/\s+/g, ' ').slice(0, 160)
          items.push(`    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE}/detail-Article/${id}</link>
      <guid isPermaLink="true">${SITE}/detail-Article/${id}</guid>
      <pubDate>${rfc822(a.publishDate)}</pubDate>
      <description>${escapeXml(desc)}</description>
    </item>`)
        })
    }
    const lastBuild = new Date().toUTCString()
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Padukuhan Kedung – Website Resmi</title>
    <link>${SITE}</link>
    <description>Berita dan informasi resmi Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta.</description>
    <language>id</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>`

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).send(xml)
  } catch (err) {
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Padukuhan Kedung</title></channel></rss>')
  }
}