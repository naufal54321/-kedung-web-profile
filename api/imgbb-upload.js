/* eslint-env node */
const MAX_BASE64_LENGTH = 8 * 1024 * 1024

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'IMGBB_API_KEY tidak dikonfigurasi' })
    return
  }

  try {
    const { image } = req.body || {}
    if (typeof image !== 'string' || image.length === 0 || image.length > MAX_BASE64_LENGTH) {
      res.status(400).json({ error: 'Data gambar tidak valid' })
      return
    }

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      body: new URLSearchParams({ image })
    })
    const data = await response.json()
    if (data.success) {
      res.status(200).json({ url: data.data.url })
    } else {
      res.status(502).json({ error: data.error?.message || 'Upload ImgBB gagal' })
    }
  } catch (err) {
    console.error('imgbb-upload error:', err)
    res.status(500).json({ error: 'Gagal mengunggah gambar' })
  }
}
