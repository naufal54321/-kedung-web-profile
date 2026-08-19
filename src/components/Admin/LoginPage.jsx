import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { FaUserShield, FaArrowLeft, FaSpinner } from 'react-icons/fa'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      sessionStorage.removeItem('admin2fa-ok-' + email)
      navigate('/admin')
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Email atau password salah')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak percobaan. Coba lagi nanti')
      } else {
        setError('Gagal login: ' + err.message)
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
        <p className="admin-login-subtitle">Masuk untuk mengelola konten website</p>

        {error && <div className="admin-login-error">{error}</div>}

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

        <a href="/" className="admin-login-back">
          <FaArrowLeft size={12} /> Kembali ke Website
        </a>
      </div>
    </div>
  )
}

export default LoginPage