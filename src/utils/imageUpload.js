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

const isHeic = (file) => {
  const name = String(file?.name || '').toLowerCase()
  const type = String(file?.type || '').toLowerCase()
  return /\.(heic|heif)$/.test(name) || type.includes('image/heic') || type.includes('image/heif')
}

const convertHeicToJpeg = async (file) => {
  try {
    const { default: heic2any } = await import('heic2any')
    const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.85 })
    const blob = Array.isArray(result) ? result[0] : result
    if (!blob) throw new Error('Konversi HEIC menghasilkan file kosong')
    return new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' })
  } catch (err) {
    console.error('HEIC conversion error:', err)
    throw new Error('Gagal mengonversi format HEIC')
  }
}

const uploadToImgBB = async (file) => {
  const sourceFile = isHeic(file) ? await convertHeicToJpeg(file) : file
  const compressed = await compressImage(sourceFile)
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
