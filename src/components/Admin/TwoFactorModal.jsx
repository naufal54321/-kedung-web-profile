import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import { multiFactor, TotpMultiFactorGenerator } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { FaShieldAlt, FaQrcode, FaCheckCircle, FaSpinner, FaTrash } from 'react-icons/fa'

const ISSUER = 'Padukuhan Kedung'

function TwoFactorModal({ show, onHide }) {
  const [factors, setFactors] = useState([])
  const [secret, setSecret] = useState(null)
  const [qrUrl, setQrUrl] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [busy, setBusy] = useState(false)
  const [step, setStep] = useState('idle')

  const refreshFactors = useCallback(() => {
    const user = auth.currentUser
    if (user) {
      setFactors(multiFactor(user).enrolledFactors || [])
    } else {
      setFactors([])
    }
  }, [])

  useEffect(() => {
    if (show) {
      setError('')
      setSuccess('')
      setCode('')
      setSecret(null)
      setQrUrl('')
      setStep('idle')
      refreshFactors()
    }
  }, [show, refreshFactors])

  const handleStart = async () => {
    const user = auth.currentUser
    if (!user) return
    setError('')
    setSuccess('')
    setBusy(true)
    try {
      const session = await multiFactor(user).getSession()
      const newSecret = await TotpMultiFactorGenerator.generateSecret(session)
      const { default: QRCode } = await import('qrcode')
      const dataUrl = await QRCode.toDataURL(
        newSecret.generateQrCodeUrl(user.email || 'admin', ISSUER),
        { width: 220, margin: 1, color: { dark: '#1f2937', light: '#ffffff' } }
      )
      setSecret(newSecret)
      setQrUrl(dataUrl)
      setStep('qr')
    } catch (err) {
      setError(err.message || 'Gagal menyiapkan 2FA')
    }
    setBusy(false)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const assertion = TotpMultiFactorGenerator.assertionForEnrollment(secret, code.trim())
      await multiFactor(auth.currentUser).enroll(assertion, 'Authenticator')
      refreshFactors()
      setStep('idle')
      setSecret(null)
      setQrUrl('')
      setCode('')
      setSuccess('2FA berhasil diaktifkan!')
    } catch (err) {
      setError(err.code === 'auth/invalid-verification-code' ? 'Kode verifikasi salah. Coba lagi' : err.message)
    }
    setBusy(false)
  }

  const handleUnenroll = async (factor) => {
    setError('')
    setSuccess('')
    if (!window.confirm('Nonaktifkan faktor ini? Anda tidak akan lagi diminta kode saat login.')) return
    setBusy(true)
    try {
      await multiFactor(auth.currentUser).unenroll(factor.uid)
      refreshFactors()
      setSuccess('2FA dinonaktifkan')
    } catch (err) {
      setError(err.message || 'Gagal menonaktifkan')
    }
    setBusy(false)
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="admin-2fa-title"><FaShieldAlt className="me-2" />Keamanan Login (2FA)</Modal.Title>
      </Modal.Header>
      <Modal.Body className="admin-2fa-body">
        {error && <Alert variant="danger" className="py-2" role="alert">{error}</Alert>}
        {success && <Alert variant="success" className="py-2" role="alert">{success}</Alert>}

        {step === 'idle' && (
          <>
            <p className="admin-2fa-desc">
              Lindungi akun admin dengan verifikasi dua langkah. Setelah diaktifkan, login membutuhkan
              kode 6 digit dari aplikasi authenticator (Google Authenticator, Aegis, Microsoft Authenticator, dll).
            </p>
            {factors.length === 0 ? (
              <div className="admin-2fa-empty">
                <FaQrcode size={36} className="admin-2fa-empty-icon" />
                <p>Belum ada faktor 2FA terpasang.</p>
                <Button variant="success" onClick={handleStart} disabled={busy}>
                  {busy ? <><FaSpinner className="fa-spin me-2" />Menyiapkan...</> : 'Aktifkan 2FA'}
                </Button>
              </div>
            ) : (
              <div className="admin-2fa-list">
                {factors.map((f) => (
                  <div key={f.uid} className="admin-2fa-item">
                    <div>
                      <strong>{f.displayName || (f.factorId === 'totp' ? 'Authenticator' : f.factorId)}</strong>
                      <span className="admin-2fa-item-sub">{f.factorId === 'totp' ? 'TOTP (kode 6 digit)' : f.factorId} · {f.enrollmentTime || ''}</span>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => handleUnenroll(f)} disabled={busy}>
                      <FaTrash /> Nonaktifkan
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {step === 'qr' && (
          <>
            <div className="admin-2fa-qr-wrap">
              <div className="admin-2fa-qr">
                {qrUrl ? <img src={qrUrl} alt="QR Code 2FA" width={220} height={220} /> : <FaSpinner className="fa-spin" size={32} />}
              </div>
              <div className="admin-2fa-qr-text">
                <h6 className="admin-2fa-step-title">1. Pindai kode QR</h6>
                <p>Buka aplikasi authenticator di HP, pilih "Add account" → "Scan QR code", lalu arahkan ke kode di samping.</p>
                <h6 className="admin-2fa-step-title">2. Masukkan kode</h6>
                <p>Ketik kode 6 digit yang muncul di aplikasi untuk mengonfirmasi aktivasi.</p>
                {secret && (
                  <p className="admin-2fa-secret">
                    Tidak bisa memindai? Masukkan kunci manual:<br />
                    <code>{secret.secretKey}</code>
                  </p>
                )}
              </div>
            </div>
            <form onSubmit={handleVerify} className="admin-2fa-form">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Kode 6 digit"
                className="admin-2fa-code"
                autoFocus
                required
              />
              <Button variant="success" type="submit" disabled={busy || code.length !== 6}>
                {busy ? <><FaSpinner className="fa-spin me-2" />Mengaktifkan...</> : <><FaCheckCircle className="me-1" />Aktifkan</>}
              </Button>
            </form>
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default TwoFactorModal
