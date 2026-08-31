import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const STREET_TILE = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const SATELLITE_TILE = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: '&copy; Esri, Maxar, Earthstar Geographics',
};

const CENTER = [-7.8856475010263996, 110.30198600000003];

const pinIcon = L.divIcon({
  className: 'kontak-marker',
  html: `<div class="kontak-marker-pin"><span></span></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 34],
  popupAnchor: [0, -32],
});

function KontakMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tileLayerRef = useRef(null);
  const [isSatellite, setIsSatellite] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(CENTER, 17);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapRef.current = map;

    const marker = L.marker(CENTER, { icon: pinIcon, riseOnHover: true }).addTo(map);
    marker.bindPopup('<div class="kontak-popup"><strong>Padukuhan Kedung</strong><br/>Guwosari, Pajangan, Bantul, DIY</div>').openPopup();

    marker.on('click', () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${CENTER[0]},${CENTER[1]}`;
      window.open(url, '_blank');
    });

    return () => {
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tile = isSatellite ? SATELLITE_TILE : STREET_TILE;
    const layer = L.tileLayer(tile.url, {
      attribution: tile.attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = layer;
  }, [isSatellite]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={containerRef} className="kontak-map-leaflet" />
      <button
        onClick={() => setIsSatellite((prev) => !prev)}
        className="map-toggle-btn"
        title={isSatellite ? 'Tampilkan Peta' : 'Tampilkan Satelit'}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          background: 'var(--card, #fff)',
          border: '1px solid var(--border-color, #ccc)',
          borderRadius: 8,
          padding: '6px 12px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-primary, #333)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        {isSatellite ? '🗺️ Peta' : '🛰️ Satelit'}
      </button>
    </div>
  );
}

export default KontakMap;