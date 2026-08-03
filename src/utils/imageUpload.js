import config from './config'

const MAX_DIMENSION = 1600
const QUALITY = 0.82

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Gagal membaca file'))
    reader.readAsDataURL(file)
  })
}

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Gagal memuat gambar'))
    img.src = src
  })
}

const compressImage = async (file) => {
  let image
  try {
    if ('createImageBitmap' in window) {
      image = await createImageBitmap(file, { imageOrientation: 'from-image' })
    } else {
      throw new Error('createImageBitmap tidak didukung')
    }
  } catch {
    image = await loadImage(await readFileAsDataURL(file))
  }

  let { width, height } = image
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  const toBlob = (type) =>
    new Promise((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Gagal kompresi gambar'))), type, QUALITY)
    })

  const blob = await toBlob('image/webp')
  if (blob.type === 'image/png') {
    const jpegBlob = await toBlob('image/jpeg')
    return new File([jpegBlob], 'compressed.jpg', { type: 'image/jpeg' })
  }
  return new File([blob], 'compressed.webp', { type: 'image/webp' })
}

const uploadToImgBB = async (file) => {
  const compressed = await compressImage(file)
  const base64 = (await readFileAsDataURL(compressed)).split(',')[1]
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${config.IMGBB_API_KEY}`, {
    method: 'POST',
    body: new URLSearchParams({ image: base64 })
  })
  const data = await res.json()
  if (data.success) return data.data.url
  throw new Error(data.error?.message || 'Gagal upload')
}

export default uploadToImgBB
