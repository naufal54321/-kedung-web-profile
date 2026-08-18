/* eslint-env node */
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC0es4D-9_rDTdUEO80xKZNw'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

async function fetchFeed() {
  let lastError = null
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(FEED_URL, { headers: { 'User-Agent': UA } })
      if (response.ok) return await response.text()
      lastError = new Error(`Feed HTTP ${response.status}`)
    } catch (err) {
      lastError = err
    }
    if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 800 * (attempt + 1)))
  }
  throw lastError || new Error('Feed gagal')
}

function unescapeXml(str = '') {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

export default async function handler(req, res) {
  try {
    const feed = await fetchFeed()
    const videos = []
    const entryRe = /<entry>([\s\S]*?)<\/entry>/g
    let match
    while ((match = entryRe.exec(feed)) !== null) {
      const block = match[1]
      const id = (block.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1]
      const title = (block.match(/<title>(.*?)<\/title>/) || [])[1]
      const published = (block.match(/<published>(.*?)<\/published>/) || [])[1]
      if (id && title) {
        videos.push({
          id,
          title: unescapeXml(title),
          published: published || ''
        })
      }
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', videos.length > 0 ? 'public, max-age=1800' : 'no-store')
    res.status(200).json({ videos })
  } catch (err) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json({ videos: [] })
  }
}
