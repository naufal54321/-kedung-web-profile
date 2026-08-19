/* eslint-env node */
const DATABASE_URL = 'https://kedung-api-7eaed-default-rtdb.asia-southeast1.firebasedatabase.app'

function nodeUrl(path) {
  return `${DATABASE_URL}/${path}.json`
}

function authQuery(idToken) {
  return `?auth=${encodeURIComponent(idToken)}`
}

export async function readNode(path, idToken) {
  const res = await fetch(`${nodeUrl(path)}${authQuery(idToken)}`)
  if (!res.ok) throw new Error(`Gagal membaca database (${res.status})`)
  return res.json()
}

export async function writeNode(path, value, idToken) {
  const res = await fetch(`${nodeUrl(path)}${authQuery(idToken)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value)
  })
  if (!res.ok) throw new Error(`Gagal menyimpan database (${res.status})`)
}

export async function deleteNode(path, idToken) {
  const res = await fetch(`${nodeUrl(path)}${authQuery(idToken)}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Gagal menghapus (${res.status})`)
}