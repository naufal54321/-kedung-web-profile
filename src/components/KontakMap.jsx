import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

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

  useEffect(() => {
    if (!containerRef.current) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(CENTER, 17);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer(isDark ? DARK_TILES : LIGHT_TILES, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker(CENTER, { icon: pinIcon, riseOnHover: true }).addTo(map);
    marker.bindPopup('<div class="kontak-popup"><strong>Padukuhan Kedung</strong><br/>Guwosari, Pajangan, Bantul, DIY</div>').openPopup();

    marker.on('click', () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${CENTER[0]},${CENTER[1]}`;
      window.open(url, '_blank');
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className="kontak-map-leaflet" />;
}

export default KontakMap;