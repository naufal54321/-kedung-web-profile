import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  useEffect(() => {
    // Inisialisasi peta
    const map = L.map('map').setView([-7.8867112, 110.3016377], 17); // Set koordinat latitude dan longitude

    // Tambahkan layer tile dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Tambahkan marker ke peta
    const marker = L.marker([-7.8867112, 110.3016377]).addTo(map)
      .bindPopup('Ingkung Kuali')
      .openPopup();

    // Tambahkan event click pada marker
    marker.on('click', function() {
      // Buat URL Google Maps dengan koordinat yang sesuai
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${marker.getLatLng().lat},${marker.getLatLng().lng}`;
      
      // Buka URL Google Maps
      window.open(googleMapsUrl, '_blank');
    });
  }, []);

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default Map;
