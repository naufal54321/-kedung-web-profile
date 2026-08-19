import { describe, it, expect } from 'vitest'
import { generateSync } from 'otplib'
import { generateSecret, makeOtpauthUrl, encryptSecret, decryptSecret, verifyTotp } from '../../api/_totp.js'

const KEY = new Uint8Array(32).fill(7)

describe('totp crypto', () => {
  it('encrypt/decrypt roundtrip', () => {
    const secret = generateSecret()
    const blob = encryptSecret(secret, KEY)
    expect(decryptSecret(blob, KEY)).toBe(secret)
  })

  it('fails to decrypt with wrong key', () => {
    const blob = encryptSecret('ABCDEFGH', KEY)
    const wrong = new Uint8Array(32).fill(9)
    expect(() => decryptSecret(blob, wrong)).toThrow()
  })

  it('rejects invalid blob', () => {
    expect(() => decryptSecret(null, KEY)).toThrow()
    expect(() => decryptSecret({}, KEY)).toThrow()
  })

  it('generateSecret produces base32 string', () => {
    const secret = generateSecret()
    expect(secret).toMatch(/^[A-Z2-7]+$/)
    expect(secret.length).toBeGreaterThanOrEqual(16)
  })

  it('makeOtpauthUrl contains otpauth scheme and issuer', () => {
    const url = makeOtpauthUrl(generateSecret(), 'admin@example.com')
    expect(url).toMatch(/^otpauth:\/\/totp\//)
    expect(url).toContain('issuer=Padukuhan%20Kedung')
    expect(url).toContain('admin%40example.com')
  })

  it('verifyTotp accepts current code and rejects wrong/invalid', () => {
    const secret = generateSecret()
    const current = generateSync({ secret })
    expect(verifyTotp(secret, current)).toBe(true)
    expect(verifyTotp(secret, '000000')).toBe(false)
    expect(verifyTotp(secret, '123')).toBe(false)
    expect(verifyTotp(secret, 'abcdef')).toBe(false)
    expect(verifyTotp(secret, '')).toBe(false)
  })
})