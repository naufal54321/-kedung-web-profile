import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getMultiFactorResolver, TotpMultiFactorGenerator } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { FaUserShield, FaArrowLeft, FaSpinner, FaShieldAlt } from 'react-icons/fa'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [phase, setPhase] = useState('password')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const resolverRef = useRef(null)
  const hintUidRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch (err) {
      if (err.code === 'auth/multi-factor-auth-required') {
        resolverRef.current = getMultiFactorResolver(auth, err)
        const hint = (resolverRef.current.hints || []).find(h => h.factorId === 'totp')
        if (hint) {
          hintUidRef.current = hint.uid
          setPhase('code')
        } else {
          setError('Akun memerlukan verifikasi 2FA, tetapi tidak ada faktor TOTP terdaftar')
        }
      } else if (err.code === 'auth/invalid-credential') {
        setError('Email atau password salah')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak percobaan. Coba lagi nanti')
      } else {
        setError('Gagal login: ' + err.message)
      }
    }
    setLoading(false)
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const assertion = TotpMultiFactorGenerator.assertionForSignIn(hintUidRef.current, code.trim())
      await resolverRef.current.resolveSignIn(assertion)
      navigate('/admin')
    } catch (err) {
      if (err.code === 'auth/invalid-verification-code') {
        setError('Kode verifikasi salah. Coba lagi')
      } else {
        setError('Gagal verifikasi: ' + err.message)
      }
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-orb" />
      <div className="admin-login-orb" />
      <div className="admin-login-orb" />

      <div className="admin-login-card">
        <div className="admin-login-logo">
          <FaUserShield />
        </div>
        <h2 className="admin-login-title">Admin Panel</h2>
        {phase === 'password' ? (
          <p className="admin-login-subtitle">Masuk untuk mengelola konten website</p>
        ) : (
          <p className="admin-login-subtitle"><FaShieldAlt className="me-1" />Masukkan kode dari aplikasi Authenticator</p>
        )}

        {error && <div className="admin-login-error">{error}</div>}

        {phase === 'password' ? (
          <form onSubmit={handleSubmit}>
            <div className="admin-floating-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>

            <div className="admin-floating-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label>Password</label>
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? <><FaSpinner className="fa-spin me-2" />Memproses...</> : 'Masuk'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
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

            <button type="submit" className="admin-login-btn" disabled={loading || code.length !== 6}>
              {loading ? <><FaSpinner className="fa-spin me-2" />Memproses...</> : 'Verifikasi'}
            </button>
            <button
              type="button"
              className="admin-login-back-btn"
              onClick={() => { setPhase('password'); setCode(''); setError('') }}
            >
              Kembali
            </button>
          </form>
        )}

        <a href="/" className="admin-login-back">
          <FaArrowLeft size={12} /> Kembali ke Website
        </a>
      </div>
    </div>
  )
}

export default LoginPage
