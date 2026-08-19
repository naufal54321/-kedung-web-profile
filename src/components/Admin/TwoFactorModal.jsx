import { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import { auth } from '../../utils/firebase'
import { FaShieldAlt, FaQrcode, FaCheckCircle, FaSpinner, FaTrash } from 'react-icons/fa'

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan')
  return data
}

function TwoFactorModal({ show, onHide }) {
  const [enabled, setEnabled] = useState(false)
  const [secret, setSecret] = useState(null)
  const [qrUrl, setQrUrl] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [busy, setBusy] = useState(false)
  const [step, setStep] = useState('idle')

  const refreshStatus = useCallback(async () => {
    const user = auth.currentUser
    if (!user) return
    try {
      const idToken = await user.getIdToken()
      const data = await postJson('/api/2fa-status', { idToken })
      setEnabled(data.enabled)
    } catch (err) {
      setError(err.message || 'Gagal memeriksa 2FA')
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
      refreshStatus()
    }
  }, [show, refreshStatus])

  const handleStart = async () => {
    const user = auth.currentUser
    if (!user) return
    setError('')
    setSuccess('')
    setBusy(true)
    try {
      const idToken = await user.getIdToken()
      const data = await postJson('/api/2fa-enroll', { idToken })
      const { default: QRCode } = await import('qrcode')
      const dataUrl = await QRCode.toDataURL(
        data.otpauth,
        { width: 220, margin: 1, color: { dark: '#1f2937', light: '#ffffff' } }
      )
      setSecret(data.secret)
      setQrUrl(dataUrl)
      setStep('qr')
    } catch (err) {
      setError(err.message || 'Gagal menyiapkan 2FA')
    }
    setBusy(false)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user) return
    setError('')
    setBusy(true)
    try {
      const idToken = await user.getIdToken()
      await postJson('/api/2fa-verify', { idToken, code: code.trim(), secret })
      setEnabled(true)
      setStep('idle')
      setSecret(null)
      setQrUrl('')
      setCode('')
      setSuccess('2FA berhasil diaktifkan!')
    } catch (err) {
      setError(err.message || 'Gagal verifikasi')
    }
    setBusy(false)
  }

  const handleDisable = async (e) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user) return
    setError('')
    setBusy(true)
    try {
      const idToken = await user.getIdToken()
      await postJson('/api/2fa-disable', { idToken, code: code.trim() })
      setEnabled(false)
      setStep('idle')
      setCode('')
      setSuccess('2FA dinonaktifkan')
      sessionStorage.removeItem('admin2fa-ok-' + user.email)
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
            {!enabled ? (
              <div className="admin-2fa-empty">
                <FaQrcode size={36} className="admin-2fa-empty-icon" />
                <p>Belum ada faktor 2FA terpasang.</p>
                <Button variant="success" onClick={handleStart} disabled={busy}>
                  {busy ? <><FaSpinner className="fa-spin me-2" />Menyiapkan...</> : 'Aktifkan 2FA'}
                </Button>
              </div>
            ) : (
              <div className="admin-2fa-list">
                <div className="admin-2fa-item">
                  <div>
                    <strong>Authenticator (TOTP)</strong>
                    <span className="admin-2fa-item-sub">TOTP (kode 6 digit) · Aktif</span>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => setStep('disable')} disabled={busy}>
                    <FaTrash /> Nonaktifkan
                  </Button>
                </div>
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
                    <code>{secret}</code>
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

        {step === 'disable' && (
          <form onSubmit={handleDisable} className="admin-2fa-form">
            <p className="admin-2fa-desc">Masukkan kode 6 digit saat ini untuk menonaktifkan 2FA.</p>
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
            <Button variant="danger" type="submit" disabled={busy || code.length !== 6}>
              {busy ? <><FaSpinner className="fa-spin me-2" />Memproses...</> : <><FaTrash className="me-1" />Nonaktifkan</>}
            </Button>
            <Button variant="secondary" onClick={() => { setStep('idle'); setCode(''); setError('') }} disabled={busy}>
              Batal
            </Button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default TwoFactorModal