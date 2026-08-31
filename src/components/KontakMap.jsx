import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILE_PROVIDERS = [
  {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    name: 'Esri World Street Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap contributors'
  }
];

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

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(CENTER, 17);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Try first provider, fallback on tile error
    let tileIndex = 0;
    let currentLayer = null;

    function addTiles() {
      const provider = TILE_PROVIDERS[tileIndex];
      if (!provider) return;

      const layer = L.tileLayer(provider.url, {
        attribution: provider.attribution,
        maxZoom: 19,
      });

      let errorCount = 0;
      layer.on('tileerror', () => {
        errorCount++;
        if (errorCount >= 3 && tileIndex < TILE_PROVIDERS.length - 1) {
          map.removeLayer(layer);
          tileIndex++;
          addTiles();
        }
      });

      layer.addTo(map);
      currentLayer = layer;
    }

    addTiles();

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