/* eslint-env node */
import { verifyIdToken } from './_verifyToken.js'
import { isAdminEmail } from './_admins.js'
import { encryptSecret, decryptSecret, verifyTotp, getEncryptionKey } from './_totp.js'
import { readNode, writeNode } from './_rtdb.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const { idToken, code, secret } = req.body || {}
    const { uid, email } = await verifyIdToken(idToken)
    if (!isAdminEmail(email)) {
      res.status(403).json({ error: 'Bukan akun admin' })
      return
    }
    const path = `admin2fa/${uid}`
    const existing = await readNode(path, idToken)

    let targetSecret = null
    if (existing) {
      targetSecret = decryptSecret(existing, getEncryptionKey())
    } else if (typeof secret === 'string' && secret.length > 0) {
      targetSecret = secret
    } else {
      res.status(404).json({ error: '2FA belum diaktifkan' })
      return
    }

    if (!verifyTotp(targetSecret, String(code || '').trim())) {
      res.status(403).json({ error: 'Kode verifikasi salah' })
      return
    }

    if (!existing) {
      await writeNode(path, encryptSecret(targetSecret, getEncryptionKey()), idToken)
    }
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Gagal verifikasi' })
  }
}