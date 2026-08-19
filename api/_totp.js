/* eslint-env node */
import crypto from 'node:crypto'
import { generateSecret, generateURI, verifySync } from 'otplib'

const ISSUER = 'Padukuhan Kedung'
const TOLERANCE_SECONDS = 60

export function getEncryptionKey() {
  const key = Buffer.from(process.env.TOTP_SECRET_KEY || '', 'base64')
  if (key.length !== 32) {
    throw new Error('TOTP_SECRET_KEY harus base64 dari 32 byte (AES-256)')
  }
  return key
}

export { generateSecret }

export function makeOtpauthUrl(secret, email) {
  return generateURI({
    issuer: ISSUER,
    label: email,
    secret,
    algorithm: 'sha1',
    digits: 6,
    period: 30
  })
}

export function encryptSecret(secret, key = getEncryptionKey()) {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const enc = Buffer.concat([cipher.update(secret, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return {
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    data: enc.toString('hex')
  }
}

export function decryptSecret(blob, key = getEncryptionKey()) {
  const { iv, tag, data } = blob || {}
  if (!iv || !tag || !data) {
    throw new Error('Data secret tidak valid')
  }
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(tag, 'hex'))
  return Buffer.concat([
    decipher.update(Buffer.from(data, 'hex')),
    decipher.final()
  ]).toString('utf8')
}

export function verifyTotp(secret, code) {
  if (!/^\d{6}$/.test(code || '')) return false
  try {
    const result = verifySync({
      secret,
      token: code,
      epochTolerance: TOLERANCE_SECONDS
    })
    return result.valid === true
  } catch {
    return false
  }
}