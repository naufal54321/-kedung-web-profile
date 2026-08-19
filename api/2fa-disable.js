/* eslint-env node */
import { verifyIdToken } from './_verifyToken.js'
import { isAdminEmail } from './_admins.js'
import { decryptSecret, verifyTotp, getEncryptionKey } from './_totp.js'
import { readNode, deleteNode } from './_rtdb.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const { idToken, code } = req.body || {}
    const { email } = await verifyIdToken(idToken)
    if (!isAdminEmail(email)) {
      res.status(403).json({ error: 'Bukan akun admin' })
      return
    }
    const path = `admin2fa/${encodeURIComponent(email)}`
    const existing = await readNode(path, idToken)
    if (!existing) {
      res.status(404).json({ error: '2FA belum diaktifkan' })
      return
    }
    if (!verifyTotp(decryptSecret(existing, getEncryptionKey()), String(code || '').trim())) {
      res.status(403).json({ error: 'Kode verifikasi salah' })
      return
    }
    await deleteNode(path, idToken)
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Gagal menonaktifkan' })
  }
}