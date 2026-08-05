import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api from '../../utils/api'
import { Table, Button, Alert } from 'react-bootstrap'
import { FaNewspaper, FaStore, FaUsers, FaBuilding, FaImage, FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaCheckCircle, FaArrowRight, FaArrowLeft, FaChartBar, FaCalendarCheck, FaThLarge, FaClock, FaInbox, FaExclamationTriangle, FaChevronRight, FaHome, FaCalendarDay, FaEnvelope } from 'react-icons/fa'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'
import AdminChart from './AdminChart'
import CountUp from '../CountUp'

const PATH_TO_TAB = { artikel: 'artikel', umkm: 'umkm', struktur: 'struktur', lembaga: 'lembaga', carousel: 'carousel', agenda: 'agenda', pesan: 'pesan' }

const tabs = [
  { key: 'artikel', icon: FaNewspaper, label: 'Artikel', detailsLink: '/admin/artikel', color: '#fff', bg: 'linear-gradient(135deg, #2C5F2D, #4CAF50)' },
  { key: 'umkm', icon: FaStore, label: 'UMKM', detailsLink: '/admin/umkm', color: '#fff', bg: 'linear-gradient(135deg, #1565C0, #42A5F5)' },
  { key: 'struktur', icon: FaUsers, label: 'Struktur', detailsLink: '/admin/struktur', color: '#fff', bg: 'linear-gradient(135deg, #6A1B9A, #AB47BC)' },
  { key: 'lembaga', icon: FaBuilding, label: 'Lembaga', detailsLink: '/admin/lembaga', color: '#fff', bg: 'linear-gradient(135deg, #E65100, #FF7043)' },
  { key: 'carousel', icon: FaImage, label: 'Carousel', detailsLink: '/admin/carousel', color: '#fff', bg: 'linear-gradient(135deg, #00897B, #26A69A)' },
  { key: 'agenda', icon: FaCalendarAlt, label: 'Agenda', detailsLink: '/admin/agenda', color: '#fff', bg: 'linear-gradient(135deg, #F9A825, #FFD54F)' },
  { key: 'pesan', icon: FaEnvelope, label: 'Pesan Masuk', detailsLink: '/admin/pesan', color: '#fff', bg: 'linear-gradient(135deg, #00695C, #26A69A)' },
]

function Dashboard() {
  const location = useLocation()
  const isOverview = location.pathname === '/admin'
  const [data, setData] = useState({})
  const [loading, setLoading] = useState({})
  const [error, setError] = useState('')
  const [tab, setTab] = useState('artikel')
  const [page, setPage] = useState({})
  const perPage = 10
  const navigate = useNavigate()

  useEffect(() => {
    const newTab = PATH_TO_TAB[location.pathname.split('/').pop()] || 'artikel'
    setTab(newTab)
  }, [location.pathname])

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    const fetchers = {
      artikel: () => api.getAllArticles(),
      umkm: () => api.getAllUmkmAdmin(),
      struktur: () => api.getAllStrukturs(),
      lembaga: () => api.getAllLembagas(),
      carousel: () => api.getAllCarousels(),
      agenda: () => api.getAllAgendas(),
      pesan: () => api.getAllMessages(),
    }
    for (const [key, fn] of Object.entries(fetchers)) {
      setLoading(prev => ({ ...prev, [key]: true }))
      try {
        const result = await fn()
        const sorted = key === 'artikel' ? result.sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || '')) : result
        setData(prev => ({ ...prev, [key]: sorted }))
      } catch { setError(`Gagal memuat ${key}`) }
      setLoading(prev => ({ ...prev, [key]: false }))
    }
  }

  const confirmSwal = async (title, text, icon = 'warning') => {
    const result = await Swal.fire({
      title, text, icon, showCancelButton: true,
      confirmButtonColor: icon === 'success' ? '#2C5F2D' : '#dc3545',
      confirmButtonText: 'Ya', cancelButtonText: 'Batal', reverseButtons: true,
    })
    return result.isConfirmed
  }

  const handleDelete = async (key, id, name, deleteFn) => {
    const ok = await confirmSwal(`Hapus ${key}?`, `Yakin ingin menghapus "${name}"?`)
    if (!ok) return
    try {
      await deleteFn(id)
      setData(prev => ({ ...prev, [key]: prev[key].filter((x) => x.id !== id) }))
      Swal.fire({ icon: 'success', title: 'Terhapus!', timer: 1500, showConfirmButton: false })
    } catch { setError(`Gagal menghapus ${key}`) }
  }

  const handleApprove = async (id, name) => {
    const ok = await confirmSwal('Setujui UMKM?', `Setujui "${name}" untuk ditampilkan di publik?`, 'success')
    if (!ok) return
    try {
      await api.updateUmkmStatus(id, 'approved')
      setData(prev => ({ ...prev, umkm: prev.umkm.map((u) => (u.id === id ? { ...u, status: 'approved' } : u)) }))
      Swal.fire({ icon: 'success', title: 'Disetujui!', timer: 1500, showConfirmButton: false })
    } catch { setError('Gagal menyetujui UMKM') }
  }

  const getEditLink = (key, id) => {
    const paths = { artikel: '/admin/articles/edit/', umkm: '/admin/umkm/edit/', struktur: '/admin/struktur/edit/', lembaga: '/admin/lembaga/edit/', carousel: '/admin/carousel/edit/', agenda: '/admin/agenda/edit/' }
    return paths[key] + id
  }

  const getNewLink = (key) => {
    const paths = { artikel: '/admin/articles/new', umkm: '/admin/umkm/new', struktur: '/admin/struktur/new', lembaga: '/admin/lembaga/new', carousel: '/admin/carousel/new', agenda: '/admin/agenda/new' }
    return paths[key]
  }

  const getPaginated = (key) => {
    const items = data[key] || []
    const currentPage = page[key] || 1
    const total = Math.ceil(items.length / perPage)
    const start = (currentPage - 1) * perPage
    return { items: items.slice(start, start + perPage), total, currentPage }
  }

  // ===== CHART DATA =====
  const barData = {
    labels: tabs.map(t => t.label),
    datasets: [{
      label: 'Jumlah Data',
      data: tabs.map(t => (data[t.key] || []).length),
      backgroundColor: tabs.map(t => t.bg),
      borderColor: tabs.map(() => 'transparent'),
      borderRadius: 6,
    }]
  }

  const umkmCategories = [...new Set((data.umkm || []).map(u => u.category).filter(Boolean))]
  const doughnutData = umkmCategories.length > 0 ? {
    labels: umkmCategories,
    datasets: [{
      data: umkmCategories.map(cat => (data.umkm || []).filter(u => u.category === cat).length),
      backgroundColor: ['#2C5F2D', '#1565C0', '#6A1B9A', '#E65100', '#00897B', '#F9A825', '#e91e63'],
    }]
  } : null

  const now = new Date()
  const agendaStatus = {
    'Akan Datang': (data.agenda || []).filter(a => new Date(a.dateStart) > now).length,
    'Berlangsung': (data.agenda || []).filter(a => new Date(a.dateStart) <= now && new Date(a.dateEnd) >= now).length,
    'Selesai': (data.agenda || []).filter(a => new Date(a.dateEnd) < now).length,
  }
  const agendaChartData = {
    labels: Object.keys(agendaStatus),
    datasets: [{
      data: Object.values(agendaStatus),
      backgroundColor: ['#4CAF50', '#FFC107', '#EF5350'],
    }]
  }

  // ===== RENDER TABLE =====
  const renderTable = () => {
    const items = data[tab] || []
    const isLoading = loading[tab]
    const { items: pageItems, total, currentPage } = getPaginated(tab)

    const columns = {
      artikel: [
        { key: 'title', label: 'Judul', render: (item) => <Link to={`/detail-Article/${item.id}`} target="_blank" className="text-decoration-none fw-medium">{item.title} <FaExternalLinkAlt size={10} className="text-muted" /></Link> },
        { key: 'author', label: 'Penulis', className: 'd-none d-md-table-cell' },
        { key: 'publishDate', label: 'Tanggal', className: 'd-none d-md-table-cell' },
      ],
      umkm: [
        { key: 'name', label: 'Nama', render: (item) => <Link to={`/detail-Umkm/${item.id}`} target="_blank" className="text-decoration-none fw-medium">{item.name} <FaExternalLinkAlt size={10} className="text-muted" /></Link> },
        { key: 'owner', label: 'Pemilik', className: 'd-none d-md-table-cell' },
        { key: 'category', label: 'Kategori', className: 'd-none d-md-table-cell' },
        { key: 'status', label: 'Status', render: (item) => {
          const isPending = (item.status || 'approved') === 'pending'
          return isPending ? <span className="badge bg-warning text-dark">Pending</span> : <span className="badge bg-success">Approved</span>
        }},
      ],
      struktur: [
        { key: 'name', label: 'Nama' },
        { key: 'job', label: 'Jabatan', className: 'd-none d-md-table-cell' },
        { key: 'contact', label: 'Kontak', className: 'd-none d-md-table-cell' },
      ],
      lembaga: [
        { key: 'name', label: 'Nama' },
        { key: 'imgUrl', label: 'Gambar', render: (item) => item.imgUrl ? <span className="badge bg-secondary">Ada</span> : <span className="badge bg-danger">Tidak</span> },
      ],
      carousel: [
        { key: 'imageUrl', label: 'Gambar', render: (item) => item.imageUrl ? <img src={item.imageUrl} alt={item.caption} style={{ width: 80, height: 40, objectFit: 'cover' }} className="rounded" /> : <span className="badge bg-danger">Tidak</span> },
        { key: 'caption', label: 'Caption' },
        { key: 'subtitle', label: 'Subtitle', className: 'd-none d-md-table-cell' },
        { key: 'sortOrder', label: 'Urutan' },
      ],
      agenda: [
        { key: 'name', label: 'Nama' },
        { key: 'dateStart', label: 'Tanggal', className: 'd-none d-md-table-cell', render: (item) => `${item.dateStart} - ${item.dateEnd}` },
        { key: 'lokasi', label: 'Lokasi', className: 'd-none d-md-table-cell' },
      ],
      pesan: [
        { key: 'name', label: 'Nama' },
        { key: 'email', label: 'Email', className: 'd-none d-md-table-cell' },
        { key: 'subject', label: 'Subjek', render: (item) => (
          <div>
            <span className="fw-medium">{item.subject || '-'}</span>
            {item.message && <p className="admin-pesan-preview mb-0">{item.message.slice(0, 80)}{item.message.length > 80 ? '...' : ''}</p>}
          </div>
        )},
        { key: 'createdAt', label: 'Diterima', className: 'd-none d-md-table-cell', render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-' },
      ],
    }

    return (
      <div className="admin-table-wrapper">
        {isLoading ? (
          <div className="admin-skeleton-table">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="admin-skeleton admin-skeleton-row" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon"><FaInbox /></div>
            <p className="admin-empty-title">Belum Ada Data</p>
            <p className="admin-empty-sub">Data {tabs.find(t => t.key === tab)?.label || ''} belum tersedia.</p>
          </div>
        ) : (
          <>
            <Table hover responsive className="admin-table admin-table-premium mb-0">
              <thead>
                <tr>
                  {(columns[tab] || []).map((col) => (
                    <th key={col.key} className={col.className || ''}>{col.label}</th>
                  ))}
                  <th style={{ width: 120 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item) => (
                  <tr key={item.id}>
                    {(columns[tab] || []).map((col) => (
                      <td key={col.key} className={col.className || ''}>
                        {col.render ? col.render(item) : item[col.key] || '-'}
                      </td>
                    ))}
                    <td>
                      {(tab === 'umkm' && (item.status || 'approved') === 'pending') && (
                        <Button variant="none" size="sm" className="admin-action-btn admin-action-approve me-1"
                          onClick={() => handleApprove(item.id, item.name)} title="Setujui"><FaCheckCircle /></Button>
                      )}
                      {tab !== 'pesan' && (
                        <Button variant="none" size="sm" className="admin-action-btn admin-action-edit me-1"
                          onClick={() => navigate(getEditLink(tab, item.id))} title="Edit"><FaEdit /></Button>
                      )}
                      <Button variant="none" size="sm" className="admin-action-btn admin-action-delete"
                        onClick={() => {
                          const deletes = { artikel: api.deleteArticle, umkm: api.deleteUmkm, struktur: api.deleteStruktur, lembaga: api.deleteLembaga, carousel: api.deleteCarousel, agenda: api.deleteAgenda, pesan: api.deleteMessage }
                          handleDelete(tab, item.id, item.name || item.title || item.subject || item.caption, deletes[tab])
                        }} title="Hapus"><FaTrash /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {total > 1 && (
              <div className="admin-pagination">
                <span className="admin-pagination-info">{items.length} data — Halaman {currentPage} dari {total}</span>
                <div className="admin-pagination-btns">
                  <button disabled={currentPage <= 1} onClick={() => setPage(p => ({ ...p, [tab]: currentPage - 1 }))}>Prev</button>
                  {Array.from({ length: total }, (_, i) => i + 1).map(p => (
                    <button key={p} className={p === currentPage ? 'active' : ''} onClick={() => setPage(pg => ({ ...pg, [tab]: p }))}>{p}</button>
                  ))}
                  <button disabled={currentPage >= total} onClick={() => setPage(p => ({ ...p, [tab]: currentPage + 1 }))}>Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  // ===== RENDER OVERVIEW =====
  const renderOverview = () => (
    <>
      <div className="row g-4 mb-4">
        <div className="col-md-7">
          <div className="admin-section-card">
            <div className="admin-section-header">
              <h6 className="admin-section-title"><FaChartBar /> Total Konten</h6>
            </div>
            <div className="p-3">
              {loading.artikel ? <div className="admin-skeleton admin-skeleton-chart" /> : <AdminChart type="bar" data={barData} />}
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="admin-section-card">
            <div className="admin-section-header">
              <h6 className="admin-section-title"><FaCalendarCheck /> Status Agenda</h6>
            </div>
            <div className="p-3">
              {loading.agenda ? <div className="admin-skeleton admin-skeleton-chart" /> : <AdminChart type="doughnut" data={agendaChartData} height={220} />}
            </div>
          </div>
        </div>
      </div>

      {doughnutData && (
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="admin-section-card">
              <div className="admin-section-header">
                <h6 className="admin-section-title"><FaThLarge /> UMKM per Kategori</h6>
              </div>
              <div className="p-3">
                <AdminChart type="doughnut" data={doughnutData} height={220} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="admin-section-card">
              <div className="admin-section-header">
                <h6 className="admin-section-title"><FaClock /> Artikel Terbaru</h6>
              </div>
              <div className="p-3">
                {(data.artikel || []).length === 0 ? (
                  <p className="text-muted text-center mb-0">Belum ada artikel</p>
                ) : (
                  (data.artikel || []).slice(0, 5).map((art, i) => (
                    <div key={art.id} className="admin-recent-item">
                      <div className="admin-recent-num">{i + 1}</div>
                      <div className="admin-recent-info">
                        <span className="admin-recent-title">{art.title}</span>
                        <span className="admin-recent-meta">{art.author} • {art.publishDate}</span>
                      </div>
                      <FaArrowRight size={12} className="admin-recent-arrow" onClick={() => navigate(`/detail-Article/${art.id}`)} />
                    </div>
                  ))
                )}
                <div className="text-center mt-3">
                  <button className="admin-btn-primary btn-sm" onClick={() => navigate('/admin/artikel')}>
                    Lihat Semua <FaArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )

  return (
    <AdminLayout title={isOverview ? 'Dashboard' : `Daftar ${tabs.find(t => t.key === tab)?.label || ''}`}>
      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <div>
            <div className="admin-breadcrumb">
              <Link to="/"><FaHome /> Beranda</Link>
              <FaChevronRight />
              <span>Admin</span>
              <FaChevronRight />
              <span>{isOverview ? 'Dashboard' : (tabs.find(t => t.key === tab)?.label || '')}</span>
            </div>
            <h1 className="admin-dash-title">{isOverview ? 'Dashboard' : `Daftar ${tabs.find(t => t.key === tab)?.label || ''}`}</h1>
            <p className="admin-dash-subtitle">
              {isOverview
                ? 'Ringkasan seluruh konten dan aktivitas Padukuhan Kedung.'
                : `Kelola data ${(tabs.find(t => t.key === tab)?.label || '').toLowerCase()} pada halaman ini.`}
            </p>
          </div>
          <div className="admin-dash-date">
            <FaCalendarDay />
            {now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        {error && <Alert variant="danger" role="alert" className="admin-alert" dismissible onClose={() => setError('')}><FaExclamationTriangle /> {error}</Alert>}

        {/* Stat Cards (shown in both views) */}
        <div className="admin-stats-row">
          {tabs.map((t) => {
            const count = (data[t.key] || []).length
            const pending = t.key === 'umkm' ? (data.umkm || []).filter(u => (u.status || 'approved') === 'pending').length : 0
            return (
              <div key={t.key} className="admin-stat-card admin-stat-gradient">
                <div className="admin-stat-icon" style={{ background: t.bg, color: t.color }}><t.icon /></div>
                <div className="admin-stat-info">
                  <span className="admin-stat-count"><CountUp value={count} /></span>
                  <span className="admin-stat-label">{t.label}</span>
                </div>
                {pending > 0 && <span className="admin-stat-badge">{pending} pending</span>}
              </div>
            )
          })}
        </div>

        {isOverview ? renderOverview() : (<>
          <div className="mb-3">
            <a href="/admin" className="admin-back-link">
              <FaArrowLeft /> Kembali ke Dashboard
            </a>
          </div>
          <div className="admin-section-card">
            <div className="admin-section-header">
              <h6 className="admin-section-title">
                Daftar {tabs.find(t => t.key === tab)?.label}
              </h6>
              <div className="admin-section-actions">
                {tab !== 'pesan' && (
                  <button className="admin-btn-primary" onClick={() => navigate(getNewLink(tab))}>
                    <FaPlus /> Tambah
                  </button>
                )}
              </div>
            </div>
            {renderTable()}
          </div>
        </>)}
      </div>
    </AdminLayout>
  )
}

export default Dashboard
