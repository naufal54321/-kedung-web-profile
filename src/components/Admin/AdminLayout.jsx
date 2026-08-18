import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FaArrowLeft, FaSignOutAlt, FaBars, FaTimes, FaNewspaper, FaStore, FaUsers, FaBuilding, FaImage, FaCalendarAlt, FaHome, FaChartPie, FaUserCircle, FaEnvelope, FaComments, FaVideo } from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useAuthState } from './useAuthState'

const sidebarItems = [
  { path: '/admin', icon: FaChartPie, label: 'Dashboard', exact: true },
  { path: '/admin/artikel', icon: FaNewspaper, label: 'Artikel' },
  { path: '/admin/umkm', icon: FaStore, label: 'UMKM' },
  { path: '/admin/struktur', icon: FaUsers, label: 'Struktur' },
  { path: '/admin/lembaga', icon: FaBuilding, label: 'Lembaga' },
  { path: '/admin/carousel', icon: FaImage, label: 'Carousel' },
  { path: '/admin/agenda', icon: FaCalendarAlt, label: 'Agenda' },
  { path: '/admin/video', icon: FaVideo, label: 'Video' },
  { path: '/admin/pesan', icon: FaEnvelope, label: 'Pesan Masuk' },
  { path: '/admin/komentar', icon: FaComments, label: 'Komentar' },
]

function AdminLayout({ children, title }) {
  const location = useLocation()
  const { user } = useAuthState()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    window.location.href = '/admin/login'
  }

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path
    return location.pathname.startsWith(item.path.replace('/new', '').replace('/edit', ''))
  }

  const isFormPage = location.pathname.includes('/new') || location.pathname.includes('/edit')

  const getBackLink = () => {
    const p = location.pathname
    if (p.includes('/articles/')) return '/admin/artikel'
    if (p.includes('/umkm/')) return '/admin/umkm'
    if (p.includes('/struktur/')) return '/admin/struktur'
    if (p.includes('/lembaga/')) return '/admin/lembaga'
    if (p.includes('/carousel/')) return '/admin/carousel'
    if (p.includes('/agenda/')) return '/admin/agenda'
    if (p.includes('/video/')) return '/admin/video'
    return '/admin'
  }

  return (
    <div className="admin-wrapper">
      {/* Topbar */}
      <header className="admin-topbar">
        <button className="admin-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="admin-topbar-brand">
          <FaChartPie className="d-none d-md-inline" />
          <span>Admin Panel</span>
        </div>
        <div className="admin-topbar-right">
          <Button variant="outline-success" size="sm" href="/" className="admin-web-btn">
            <FaHome /> <span className="d-none d-md-inline">Website</span>
          </Button>
          <div className="admin-user-info">
            <FaUserCircle size={28} className="text-success" />
            <span className="admin-user-email">{user?.email}</span>
            <button className="admin-logout-btn" onClick={handleLogout} title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`admin-sidebar admin-sidebar-luxury ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <FaChartPie size={20} />
          <span>Menu</span>
        </div>
        <nav className="admin-sidebar-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-item admin-sidebar-item-luxury ${isActive(item) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-sidebar-item admin-sidebar-item-luxury" onClick={handleLogout}>
            <FaSignOutAlt size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {title && (
          <div className="admin-content-premium">
            <div className="d-flex align-items-center gap-3">
              {isFormPage && (
                <a href={getBackLink()} className="text-decoration-none text-muted d-flex align-items-center gap-1 small">
                  <FaArrowLeft /> Kembali
                </a>
              )}
              <h5 className="mb-0">{title}</h5>
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
