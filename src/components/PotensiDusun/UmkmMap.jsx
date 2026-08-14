import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const UmkmMap = ({ umkmList }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = (umkmList || []).filter((u) => u.lat && u.lng);
    if (!containerRef.current || items.length === 0) return;
    const map = L.map(containerRef.current);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const bounds = [];
    items.forEach((u) => {
      const lat = parseFloat(u.lat);
      const lng = parseFloat(u.lng);
      if (Number.isNaN(lat) || Number.isNaN(lng)) return;
      bounds.push([lat, lng]);
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<strong>${u.name}</strong><br/>${u.category || ''}<br/><a href="/detail-Umkm/${u.id}" target="_blank">Lihat detail</a>`);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [30, 30] });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 16);
    }

    return () => { map.remove(); };
  }, [umkmList]);

  if (!(umkmList || []).some((u) => u.lat && u.lng)) {
    return (
      <p className="text-center text-muted py-4">
        Belum ada UMKM dengan titik peta. Koordinat dapat ditambahkan oleh admin pada halaman edit UMKM.
      </p>
    );
  }

  return <div ref={containerRef} className="umkm-map" style={{ height: 420, borderRadius: 16, zIndex: 0 }} />;
};

export default UmkmMap;