import { useState, useEffect, useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { FaShieldAlt, FaSpinner, FaSignOutAlt } from 'react-icons/fa'

const FLAG_PREFIX = 'admin2fa-ok-'

function getFlag(email) {
  return sessionStorage.getItem(FLAG_PREFIX + email) === '1'
}

function TwoFactorGate({ children }) {
  const [state, setState] = useState('checking')
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)

  const check = useCallback(async () => {
    const user = auth.currentUser
    if (!user) return
    if (getFlag(user.email)) {
      setState('ok')
      return
    }
    setState('checking')
    setError('')
    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/2fa-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal memeriksa 2FA')
      setState(data.enabled ? 'code' : 'ok')
    } catch (err) {
      setError(err.message || 'Tidak dapat memeriksa 2FA')
      setState('error')
    }
  }, [])

  useEffect(() => {
    check()
  }, [check])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user) return
    setError('')
    setBusy(true)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/2fa-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, code: code.trim() })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal verifikasi')
      sessionStorage.setItem(FLAG_PREFIX + user.email, '1')
      setState('ok')
    } catch (err) {
      setError(err.message || 'Gagal verifikasi')
    }
    setBusy(false)
  }

  const handleLogout = async () => {
    const user = auth.currentUser
    if (user) sessionStorage.removeItem(FLAG_PREFIX + user.email)
    await signOut(auth)
    window.location.href = '/admin/login'
  }

  if (state === 'checking') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (state === 'ok') return children

  return (
    <div className="admin-login-page">
      <div className="admin-login-orb" />
      <div className="admin-login-orb" />
      <div className="admin-login-orb" />
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <FaShieldAlt />
        </div>
        <h2 className="admin-login-title">Verifikasi 2FA</h2>
        {state === 'code' ? (
          <>
            <p className="admin-login-subtitle">Masukkan kode 6 digit dari aplikasi Authenticator</p>
            {error && <div className="admin-login-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="admin-floating-group">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder=" "
                  required
                  autoFocus
                />
                <label>Kode 6 digit</label>
              </div>
              <button type="submit" className="admin-login-btn" disabled={busy || code.length !== 6}>
                {busy ? <><FaSpinner className="fa-spin me-2" />Memproses...</> : 'Verifikasi'}
              </button>
              <button type="button" className="admin-login-back-btn" onClick={handleLogout} disabled={busy}>
                <FaSignOutAlt className="me-1" /> Keluar
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="admin-login-subtitle">{error}</p>
            <button type="button" className="admin-login-btn" onClick={check}>
              Coba Lagi
            </button>
            <button type="button" className="admin-login-back-btn" onClick={handleLogout}>
              <FaSignOutAlt className="me-1" /> Keluar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwoFactorGate