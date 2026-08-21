import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Spinner } from 'react-bootstrap'
import { FaSearch, FaTimes, FaNewspaper, FaStore, FaCalendarAlt, FaLeaf, FaMountain, FaUsers, FaSeedling, FaArrowRight } from 'react-icons/fa'
import api from '../utils/api'

const SEARCHABLE = [
  {
    key: 'artikel',
    label: 'Artikel',
    icon: FaNewspaper,
    color: '#2C5F2D',
    link: (item) => `/detail-Article/${item.id}`,
    fetch: () => api.getAllArticles(),
    searchFields: ['title', 'body', 'author'],
    display: (item) => ({ title: item.title, subtitle: item.author || '' })
  },
  {
    key: 'umkm',
    label: 'UMKM',
    icon: FaStore,
    color: '#1565C0',
    link: (item) => `/detail-Umkm/${item.id}`,
    fetch: () => api.getAllUmkm(),
    searchFields: ['name', 'owner', 'category', 'description'],
    display: (item) => ({ title: item.name, subtitle: `${item.owner || ''} • ${item.category || ''}` })
  },
  {
    key: 'agenda',
    label: 'Agenda',
    icon: FaCalendarAlt,
    color: '#F9A825',
    link: () => `/Agenda`,
    searchFields: ['name', 'lokasi', 'description'],
    display: (item) => ({ title: item.name, subtitle: `${item.dateStart || ''} • ${item.lokasi || ''}` })
  },
  {
    key: 'toga',
    label: 'TOGA',
    icon: FaSeedling,
    color: '#33691E',
    link: (item) => `/Toga/${item.id}`,
    fetch: () => api.getAllTogas(),
    searchFields: ['name'],
    display: (item) => ({ title: item.name, subtitle: 'Tanaman Obat Keluarga' })
  },
  {
    key: 'hayati',
    label: 'Hayati',
    icon: FaLeaf,
    color: '#2E7D32',
    link: () => `/Hayati-NonHayati`,
    fetch: () => api.getAllHayatis(),
    searchFields: ['name'],
    display: (item) => ({ title: item.name, subtitle: 'Sumber Daya Hayati' })
  },
  {
    key: 'nonhayati',
    label: 'Non Hayati',
    icon: FaMountain,
    color: '#5D4037',
    link: () => `/Hayati-NonHayati`,
    fetch: () => api.getAllNonHayatis(),
    searchFields: ['name'],
    display: (item) => ({ title: item.name, subtitle: 'Sumber Daya Non Hayati' })
  },
  {
    key: 'struktur',
    label: 'Struktur',
    icon: FaUsers,
    color: '#6A1B9A',
    link: () => `/Struktur-Pemerintahan`,
    fetch: () => api.getAllStrukturs(),
    searchFields: ['name', 'job'],
    display: (item) => ({ title: item.name, subtitle: item.job || '' })
  }
]

function SearchOverlay({ show, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataCache, setDataCache] = useState(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (show) {
      setQuery('')
      setResults(null)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [show])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (show) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [show, onClose])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setResults(null)
      setLoading(false)
      return
    }

    let cancelled = false
    const run = async () => {
      setLoading(true)
      try {
        if (!dataCache) {
          const fetchers = SEARCHABLE.map(async (s) => {
            try {
              const items = await s.fetch()
              return { key: s.key, items: items || [] }
            } catch {
              return { key: s.key, items: [] }
            }
          })
          const entries = await Promise.all(fetchers)
          const cache = {}
          entries.forEach(({ key, items }) => { cache[key] = items })
          if (!cancelled) setDataCache(cache)
        }

        const source = dataCache || {}
        const grouped = SEARCHABLE.map((s) => {
          const items = (source[s.key] || []).filter((item) => {
            return s.searchFields.some((f) => String(item[f] || '').toLowerCase().includes(q))
          })
          return { ...s, items: items.slice(0, 5) }
        }).filter((g) => g.items.length > 0)

        if (!cancelled) setResults(grouped)
      } catch {
        if (!cancelled) setResults([])
      }
      if (!cancelled) setLoading(false)
    }

    const timer = setTimeout(run, 250)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query, dataCache])

  if (!show) return null

  const totalCount = results ? results.reduce((sum, g) => sum + g.items.length, 0) : 0

  const handleNavigate = (link) => {
    onClose()
    setDataCache(null)
    navigate(link)
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Pencarian Global">
      <div className="search-overlay-backdrop" onClick={onClose} />
      <div className="search-overlay-panel" data-aos="zoom-in">
        <div className="search-overlay-header">
          <FaSearch className="search-overlay-header-icon" />
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Cari artikel, UMKM, agenda, TOGA..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-overlay-input"
          />
          <button type="button" className="search-overlay-close" onClick={onClose} aria-label="Tutup">
            <FaTimes />
          </button>
        </div>

        <div className="search-overlay-body">
          {loading && (
            <div className="search-overlay-state">
              <Spinner animation="border" variant="success" size="sm" /> Mencari...
            </div>
          )}

          {!loading && !query && (
            <div className="search-overlay-state text-muted">
              Ketik kata kunci untuk mencari seluruh konten website
            </div>
          )}

          {!loading && query && totalCount === 0 && (
            <div className="search-overlay-state text-muted">
              Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && results && results.map((group) => (
            <div key={group.key} className="search-result-group">
              <div className="search-result-group-title">
                <group.icon size={13} style={{ color: group.color }} />
                <span>{group.label}</span>
                <span className="search-result-count">{group.items.length}</span>
              </div>
              {group.items.map((item) => {
                const d = group.display(item)
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="search-result-item"
                    onClick={() => handleNavigate(group.link(item))}
                  >
                    <div className="search-result-item-text">
                      <span className="search-result-item-title">{d.title}</span>
                      {d.subtitle && <span className="search-result-item-sub">{d.subtitle}</span>}
                    </div>
                    <FaArrowRight size={12} className="search-result-item-arrow" />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay