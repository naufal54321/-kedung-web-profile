import { useState, useMemo } from 'react'
import SEO from '../components/SEO'
import ProfilHero from '../components/Profil/ProfilHero'
import LayananCard from '../components/Persyaratan/LayananCard'
import LayananDetail from '../components/Persyaratan/LayananDetail'
import persyaratanData from '../data/persyaratanPelayanan'
import { FaSearch } from 'react-icons/fa'

function PersyaratanPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return persyaratanData
    const q = search.toLowerCase()
    return persyaratanData.filter(
      (item) =>
        item.nama.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q)
    )
  }, [search])

  const handleBack = () => {
    setSelected(null)
  }

  return (
    <main className="profil-page">
      <SEO
        title="Persyaratan Pelayanan"
        description="Daftar persyaratan dokumen untuk mengurus administrasi di Kalurahan Guwosari, Kapanewon Pajangan, Kabupaten Bantul, DIY."
      />
      <ProfilHero
        title="Persyaratan Pelayanan"
        subtitle="Daftar persyaratan dokumen untuk mengurus administrasi di Kalurahan Guwosari"
      />

      <div className="container py-4">
        {selected ? (
          <LayananDetail layanan={selected} onBack={handleBack} />
        ) : (
          <>
            <div className="persyaratan-search-wrapper" data-aos="fade-up">
              <FaSearch className="persyaratan-search-icon" />
              <input
                type="text"
                className="persyaratan-search"
                placeholder="Cari layanan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filtered.length === 0 ? (
              <div className="persyaratan-empty" data-aos="fade-up">
                <p>Layanan tidak ditemukan.</p>
              </div>
            ) : (
              <div className="persyaratan-grid">
                {filtered.map((item, index) => (
                  <div key={item.id} data-aos="fade-up" data-aos-delay={index * 50}>
                    <LayananCard layanan={item} onClick={setSelected} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default PersyaratanPage