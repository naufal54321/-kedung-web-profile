import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { FaArrowLeft, FaPrint, FaCheckCircle } from 'react-icons/fa'

function LayananDetail({ layanan, onBack }) {
  const [checked, setChecked] = useState({})
  const [activeTab, setActiveTab] = useState(null)

  const toggleCheck = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrint = () => {
    window.print()
  }

  const renderList = (items, prefix = '') => (
    <ol className="persyaratan-list">
      {items.map((item, i) => {
        const key = `${prefix}${i}`
        return (
          <li key={key} className={`persyaratan-item ${checked[key] ? 'checked' : ''}`}>
            <label className="persyaratan-check-label">
              <input
                type="checkbox"
                className="persyaratan-checkbox"
                checked={!!checked[key]}
                onChange={() => toggleCheck(key)}
              />
              <span className="persyaratan-check-custom">
                {checked[key] && <FaCheckCircle />}
              </span>
              <span className="persyaratan-text">{item}</span>
            </label>
          </li>
        )
      })}
    </ol>
  )

  const hasSub = layanan.subkategori && layanan.subkategori.length > 0
  const currentTab = activeTab || (hasSub ? layanan.subkategori[0].nama : null)

  return (
    <div className="persyaratan-detail" data-aos="fade-up">
      <div className="persyaratan-detail-header">
        <div className="persyaratan-detail-icon">
          <layanan.icon />
        </div>
        <div>
          <h3 className="persyaratan-detail-title">{layanan.nama}</h3>
          <p className="persyaratan-detail-desc">{layanan.deskripsi}</p>
        </div>
      </div>

      {hasSub ? (
        <Tabs activeKey={currentTab} onSelect={(k) => setActiveTab(k)} className="persyaratan-sub-tabs mb-3">
          {layanan.subkategori.map((sub) => (
            <Tab key={sub.nama} eventKey={sub.nama} title={sub.nama}>
              {renderList(sub.persyaratan, `${sub.nama}-`)}
            </Tab>
          ))}
        </Tabs>
      ) : (
        renderList(layanan.persyaratan)
      )}

      <div className="persyaratan-note">
        <small>* Silakan konfirmasi ketentuan terbaru kepada petugas Kalurahan Guwosari.</small>
      </div>

      <div className="persyaratan-actions no-print">
        <button className="persyaratan-btn-back" onClick={onBack}>
          <FaArrowLeft /> Kembali ke Daftar
        </button>
        <button className="persyaratan-btn-print" onClick={handlePrint}>
          <FaPrint /> Cetak Persyaratan
        </button>
      </div>
    </div>
  )
}

export default LayananDetail