import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkedAlt, FaWhatsapp, FaChevronRight, FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const buildIcon = (num, active) =>
  L.divIcon({
    className: 'umkm-marker',
    html: `<div class="umkm-marker-pin${active ? ' active' : ''}"><span>${num}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 32],
    popupAnchor: [0, -28],
  });

const UmkmMap = ({ umkmList }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState('semua');
  const [selected, setSelected] = useState(null);

  const items = useMemo(() => (umkmList || []).filter((u) => u.lat && u.lng), [umkmList]);
  const visibleItems = useMemo(
    () => (activeCategory === 'semua' ? items : items.filter((u) => u.category === activeCategory)),
    [items, activeCategory]
  );
  const categories = useMemo(
    () => ['semua', ...new Set(items.map((u) => u.category).filter(Boolean))],
    [items]
  );

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer(isDark ? DARK_TILES : LIGHT_TILES, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umkmList]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(({ marker }) => map.removeLayer(marker));
    markersRef.current = [];

    const bounds = [];
    visibleItems.forEach((u) => {
      const lat = parseFloat(u.lat);
      const lng = parseFloat(u.lng);
      if (Number.isNaN(lat) || Number.isNaN(lng)) return;
      const idx = items.indexOf(u);
      const marker = L.marker([lat, lng], {
        icon: buildIcon(idx + 1, false),
        riseOnHover: true,
      }).addTo(map);

      const wa = u.contact ? `https://wa.me/${u.contact.replace(/[^0-9]/g, '')}` : '';
      marker.bindPopup(`
        <div class="umkm-popup">
          ${u.imgUrl ? `<img class="umkm-popup-img" src="${esc(u.imgUrl)}" alt="${esc(u.name)}" loading="lazy" />` : ''}
          <div class="umkm-popup-body">
            <span class="umkm-popup-cat">${esc(u.category || 'UMKM')}</span>
            <h6 class="umkm-popup-name">${esc(u.name)}</h6>
            <div class="umkm-popup-actions">
              ${wa ? `<a class="umkm-popup-btn umkm-popup-wa" href="${esc(wa)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ''}
              <a class="umkm-popup-btn umkm-popup-detail" href="/detail-Umkm/${u.id}">Lihat Detail</a>
            </div>
          </div>
        </div>`);

      marker.on('click', () => setSelected(idx));
      markersRef.current.push({ marker, index: idx, lat, lng });
      bounds.push([lat, lng]);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 17 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 16);
    }
  }, [visibleItems, items]);

  useEffect(() => {
    markersRef.current.forEach(({ marker, index }) => {
      marker.setIcon(buildIcon(index + 1, index === selected));
    });
  }, [selected]);

  const handleSelectItem = (idx) => {
    setSelected(idx);
    const marker = markersRef.current.find((m) => m.index === idx);
    const map = mapRef.current;
    if (marker && map) {
      map.flyTo([marker.lat, marker.lng], 17, { duration: 0.6 });
      setTimeout(() => marker.marker.openPopup(), 600);
    }
  };

  if (items.length === 0) {
    return (
      <div className="umkm-map-card">
        <div className="umkm-map-header">
          <div>
            <h2 className="umkm-map-title"><FaMapMarkedAlt /> Peta Lokasi UMKM</h2>
            <p className="umkm-map-sub">Temukan lokasi UMKM Padukuhan Kedung.</p>
          </div>
        </div>
        <div className="umkm-map-empty">
          <FaStore className="umkm-map-empty-icon" />
          <h5>Belum Ada Titik Peta</h5>
          <p>Tambahkan koordinat UMKM melalui halaman admin, atau jelajahi daftar UMKM yang tersedia.</p>
          <Link to="/Daftar-UMKM" className="potensi-cta-btn text-decoration-none">
            Lihat Daftar UMKM
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="umkm-map-card">
      <div className="umkm-map-header">
        <div>
          <h2 className="umkm-map-title"><FaMapMarkedAlt /> Peta Lokasi UMKM</h2>
          <p className="umkm-map-sub">Klik marker atau daftar di samping untuk melihat lokasi dan detail UMKM.</p>
        </div>
        <span className="umkm-map-count">{items.length} UMKM terpetakan</span>
      </div>

      {categories.length > 1 && (
        <div className="umkm-map-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`umkm-map-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'semua' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      )}

      <div className="umkm-map-layout">
        <div className="umkm-map-panel">
          {visibleItems.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">Tidak ada UMKM di kategori ini.</p>
          ) : (
            visibleItems.map((u) => {
              const idx = items.indexOf(u);
              const wa = u.contact ? `https://wa.me/${u.contact.replace(/[^0-9]/g, '')}` : '';
              return (
                <div
                  key={u.id}
                  id={`umkm-map-item-${idx}`}
                  className={`umkm-map-item ${selected === idx ? 'active' : ''}`}
                  onClick={() => handleSelectItem(idx)}
                >
                  <span className="umkm-map-num">{idx + 1}</span>
                  <div className="umkm-map-item-body">
                    <span className="umkm-map-item-name">{u.name}</span>
                    <span className="umkm-map-item-cat">{u.category || 'UMKM'}</span>
                  </div>
                  {wa && (
                    <a
                      className="umkm-map-wa"
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Hubungi via WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  )}
                  <FaChevronRight className="umkm-map-chevron" />
                </div>
              );
            })
          )}
        </div>
        <div className="umkm-map-container">
          <div ref={containerRef} className="umkm-map-leaflet" />
        </div>
      </div>
    </div>
  );
};

export default UmkmMap;