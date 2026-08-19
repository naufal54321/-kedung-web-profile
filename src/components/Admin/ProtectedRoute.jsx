import { Navigate } from 'react-router-dom'
import { useAuthState } from './useAuthState'
import TwoFactorGate from './TwoFactorGate'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthState()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <TwoFactorGate>{children}</TwoFactorGate>
}

export default ProtectedRoute