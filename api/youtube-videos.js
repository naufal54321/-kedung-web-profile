/* eslint-env node */
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC0es4D-9_rDTdUEO80xKZNw'

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
    const feed = await fetch(FEED_URL).then(r => r.text())
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
    res.setHeader('Cache-Control', 'public, max-age=1800')
    res.status(200).json({ videos })
  } catch (err) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).json({ videos: [] })
  }
}
