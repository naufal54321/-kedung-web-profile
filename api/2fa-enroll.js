/* eslint-env node */
import { verifyIdToken } from './_verifyToken.js'
import { isAdminEmail } from './_admins.js'
import { generateSecret, makeOtpauthUrl } from './_totp.js'
import { readNode } from './_rtdb.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const { idToken } = req.body || {}
    const { email } = await verifyIdToken(idToken)
    if (!isAdminEmail(email)) {
      res.status(403).json({ error: 'Bukan akun admin' })
      return
    }
    const existing = await readNode(`admin2fa/${encodeURIComponent(email)}`, idToken)
    if (existing) {
      res.status(409).json({ error: '2FA sudah aktif. Nonaktifkan dulu untuk membuat ulang' })
      return
    }
    const secret = generateSecret()
    res.status(200).json({ secret, otpauth: makeOtpauthUrl(secret, email) })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Gagal menyiapkan 2FA' })
  }
}