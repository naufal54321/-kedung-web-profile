import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Padukuhan Kedung — Website Resmi',
        short_name: 'Kedung',
        description: 'Website resmi Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta.',
        theme_color: '#2C5F2D',
        background_color: '#f0faf3',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpeg,webp}'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/database'],
          ui: ['bootstrap', 'react-bootstrap', 'react-icons'],
          charts: ['chart.js', 'react-chartjs-2'],
          calendar: ['@fullcalendar/core', '@fullcalendar/daygrid', '@fullcalendar/interaction', '@fullcalendar/react'],
          maps: ['leaflet'],
        }
      }
    },
    target: 'es2020',
    cssCodeSplit: true,
  },
})
