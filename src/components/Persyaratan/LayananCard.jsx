import { FaChevronRight } from 'react-icons/fa'

function LayananCard({ layanan, onClick }) {
  const Icon = layanan.icon
  return (
    <div className="persyaratan-card" onClick={() => onClick(layanan)} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(layanan) } }}>
      <div className="persyaratan-card-icon">
        <Icon />
      </div>
      <div className="persyaratan-card-body">
        <h5 className="persyaratan-card-title">{layanan.nama}</h5>
        <p className="persyaratan-card-desc">{layanan.deskripsi}</p>
      </div>
      <FaChevronRight className="persyaratan-card-arrow" />
    </div>
  )
}

export default LayananCard