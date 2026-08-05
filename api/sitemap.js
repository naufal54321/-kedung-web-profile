/* eslint-env node */
const SITE = 'https://kedung-guwosari.vercel.app'
const BASE = process.env.VITE_FIREBASE_DATABASE_URL || 'https://kedung-api-7eaed-default-rtdb.asia-southeast1.firebasedatabase.app'

const STATIC_URLS = [
  { loc: '/', priority: '1.0', freq: 'weekly' },
  { loc: '/Sejarah', priority: '0.8', freq: 'monthly' },
  { loc: '/Visi-Misi', priority: '0.8', freq: 'monthly' },
  { loc: '/Struktur-Pemerintahan', priority: '0.8', freq: 'monthly' },
  { loc: '/Potensi-Dukuh', priority: '0.9', freq: 'weekly' },
  { loc: '/Hayati-NonHayati', priority: '0.7', freq: 'monthly' },
  { loc: '/Lembaga-Masyarakat', priority: '0.8', freq: 'monthly' },
  { loc: '/Agenda', priority: '0.9', freq: 'weekly' },
  { loc: '/Semua-Berita', priority: '0.9', freq: 'weekly' },
  { loc: '/Daftar-UMKM', priority: '0.7', freq: 'monthly' },
  { loc: '/Tentang-Developer', priority: '0.5', freq: 'yearly' },
  { loc: '/Kontak', priority: '0.7', freq: 'yearly' },
]

export default async function handler(req, res) {
  try {
    const [articles, umkms, agendas, togas] = await Promise.all([
      fetch(`${BASE}/article.json`).then(r => r.json()),
      fetch(`${BASE}/umkm.json`).then(r => r.json()),
      fetch(`${BASE}/agenda.json`).then(r => r.json()),
      fetch(`${BASE}/toga.json`).then(r => r.json()),
    ])

    const urls = STATIC_URLS.map(u => ({ loc: SITE + u.loc, freq: u.freq, priority: u.priority }))

    if (articles && typeof articles === 'object') {
      Object.keys(articles).forEach(id => {
        urls.push({ loc: `${SITE}/detail-Article/${id}`, freq: 'weekly', priority: '0.8' })
      })
    }
    if (umkms && typeof umkms === 'object') {
      Object.entries(umkms).forEach(([id, u]) => {
        if ((u.status || 'approved') === 'approved') {
          urls.push({ loc: `${SITE}/detail-Umkm/${id}`, freq: 'monthly', priority: '0.7' })
        }
      })
    }
    if (agendas && typeof agendas === 'object') {
      Object.keys(agendas).forEach(() => {
        urls.push({ loc: `${SITE}/Agenda`, freq: 'weekly', priority: '0.9' })
      })
    }
    if (togas && typeof togas === 'object') {
      Object.keys(togas).forEach(id => {
        urls.push({ loc: `${SITE}/Toga/${id}`, freq: 'monthly', priority: '0.7' })
      })
    }

    const uniqueUrls = [...new Map(urls.map(u => [u.loc, u])).values()]
    const lastmod = new Date().toISOString().slice(0, 10)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueUrls
      .map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
      .join('\n')}\n</urlset>`

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).send(xml)
  } catch (err) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>')
  }
}
