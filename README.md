# Padukuhan Kedung — Website Resmi

Website resmi Padukuhan Kedung, Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, Yogyakarta.

[![Deploy to Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://kedung-guwosari.vercel.app)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.16.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Daftar Isi

- [Tentang Aplikasi](#-tentang-aplikasi)
- [Teknologi](#-teknologi)
- [Fitur](#-fitur)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Deployment](#-deployment)
- [Konfigurasi Firebase](#-konfigurasi-firebase)
- [Environment Variables](#-environment-variables)
- [Skrip](#-skrip)
- [Keamanan](#-keamanan)

---

## 🏠 Tentang Aplikasi

**Padukuhan Kedung** adalah website profil resmi sebuah desa di bawah naungan Kalurahan Guwosari, Kecamatan Pajangan, Kabupaten Bantul, DIY. Website ini dirancang untuk menyajikan informasi lengkap tentang desa, termasuk berita, agenda, potensi desa, struktur pemerintahan, lembaga masyarakat, dan galeri.

Website ini mendukung:
- **Progressive Web App (PWA)** — dapat diinstal di perangkat pengguna
- **Mode Gelap & Terang** — pengguna dapat beralih tema
- **Pencarian Global** — pencarian lintas seluruh konten (artikel, UMKM, agenda, TOGA, hayati, non-hayati, struktur)
- **Panel Admin** — manajemen konten dengan autentikasi TOTP (Time-based One-Time Password)

---

## 🛠️ Teknologi

### Frontend
| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| React | 18.2.0 | Library UI utama |
| Vite | 5.1.4 | Build tool & dev server |
| React Bootstrap | 2.10.1 | Komponen UI |
| Bootstrap | 5.3.3 | CSS framework |
| React Router DOM | 6.22.2 | Routing |
| React Icons | 5.0.1 | Ikon |
| AOS | 2.3.4 | Animasi scroll |
| Chart.js + React Chartjs 2 | 4.4.2 / 5.2.0 | Grafik (admin) |
| FullCalendar | 6.1.15 | Kalender agenda |
| Leaflet | 1.9.4 | Peta interaktif |
| React Helmet Async | 3.0.0 | Manajemen SEO |
| SweetAlert2 | 11.26.25 | Notifikasi/dialog |
| heic2any | 0.0.4 | Konversi HEIC ke PNG |
| qrcode | 1.5.4 | Generate QR code |
| otplib | 13.4.1 | TOTP authentication |
| jose | 6.2.9 | JWT/encryption |

### Backend & Database
| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| Firebase | 12.16.0 | Realtime Database & Authentication |

### PWA & Analytics
| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| vite-plugin-pwa | 1.3.0 | Progressive Web App |
| @vercel/analytics | 2.0.1 | Web analytics |

### Testing & Linting
| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| ESLint | 8.56.0 | Linting |
| Vitest | 4.1.10 | Unit testing |
| sharp | 0.35.3 | Image optimization |

---

## ✨ Fitur

### Fitur Publik
- **Beranda** — Halaman utama dengan carousel dan informasi desa
- **Berita** — Daftar dan detail artikel berita desa
- **Potensi Desa** — Informasi potensi desa (UMKM, TOGA, hayati, non-hayati)
- **Agenda** — Kalender dan daftar agenda desa
- **Lembaga Masyarakat** — Profil lembaga desa
- **Struktur Pemerintahan** — Struktur organisasi pemerintahan desa
- **Sejarah** — Sejarah singkat desa
- **Visi & Misi** — Visi dan misi desa
- **Galeri** — Foto dan video kegiatan desa
- **Kontak** — Formulir kontak dan peta lokasi
- **Pencarian Global** — Pencarian lintas seluruh konten
- **Mode Gelap/Terang** — Toggle tema yang tersimpan di localStorage
- **PWA** — Dapat diinstal sebagai aplikasi di perangkat pengguna

### Fitur Admin
- **Dashboard** — Ringkasan statistik dan manajemen konten
- **Manajemen Artikel** — CRUD berita/artikel
- **Manajemen UMKM** — CRUD data UMKM
- **Manajemen Agenda** — CRUD agenda dengan kalender
- **Manajemen Struktur** — CRUD struktur pemerintahan
- **Manajemen Lembaga** — CRUD lembaga masyarakat
- **Manajemen TOGA** — CRUD tanaman obat keluarga
- **Manajemen Hayati/Non-Hayati** — CRUD sumber daya alam
- **Manajemen Carousel** — CRUD gambar carousel beranda
- **Manajemen Video & Foto** — CRUD media galeri
- **Autentikasi TOTP** — Login admin dengan kode OTP berbasis waktu
- **Manajemen Pesan & Komentar** — Moderasi pesan dari pengunjung

---

## ⚙️ Instalasi

### Prasyarat
- **Node.js** >= 20
- **npm** >= 10
- Akun **Firebase** (project sudah terkonfigurasi)
- Akun **Vercel** (untuk deployment)

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/naufal54321/-kedung-web-profile.git
cd -kedung-web-profile

# 2. Install dependensi
npm install

# 3. Konfigurasi environment variables
# Salin file .env.example dan sesuaikan dengan konfigurasi Firebase Anda
cp .env.example .env.local

# 4. Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser untuk melihat aplikasi.

---

## 🚀 Penggunaan

### Development Server
```bash
npm run dev
```
Server akan berjalan di `http://localhost:5173` dengan HMR (Hot Module Replacement).

### Build untuk Produksi
```bash
npm run build
```
File build akan berada di folder `dist/`.

### Preview Build
```bash
npm run preview
```
Menjalankan server lokal untuk preview build produksi.

### Linting
```bash
npm run lint
```
Memeriksa kode dengan ESLint.

### Testing
```bash
npm test
```
Menjalankan unit test dengan Vitest.

---

## 📁 Struktur Proyek

```
src/
├── index.jsx                    # Entry point aplikasi
├── App.jsx                      # Root component (routing)
├── components/
│   ├── KedungApp.jsx            # Main app wrapper (Nav, Footer, Routes)
│   ├── NavApp.jsx               # Navbar dengan tema toggle & pencarian
│   ├── FooterApp.jsx            # Footer
│   ├── SearchOverlay.jsx        # Overlay pencarian global
│   ├── Carousel.jsx             # Carousel beranda
│   ├── ScrollToTop.jsx          # Auto scroll to top
│   ├── ScrollTopFab.jsx         # Floating button scroll to top
│   ├── UpdatePrompt.jsx         # Prompt update PWA
│   ├── LoadingScreen.jsx        # Loading screen
│   ├── SEO.jsx                  # SEO component (React Helmet)
│   ├── VisitorStats.jsx         # Visitor statistics
│   ├── ButtonCustom.jsx         # Custom button component
│   ├── CountUp.jsx              # Animated counter
│   ├── CustomPagination.jsx     # Custom pagination
│   ├── EmptyState.jsx           # Empty state component
│   ├── ImagePreview.jsx         # Image preview modal
│   ├── LoaderCustom.jsx         # Custom loader
│   ├── DropdownButton.jsx       # Dropdown menu component
│   ├── agenda/
│   │   └── CustomCalendar.jsx   # Custom calendar component
│   ├── DetailArticle/           # Article detail components
│   ├── DetailPotensi/           # Potensi detail components
│   ├── Hayati/                  # Hayati/Non-hayati components
│   ├── Home/                    # Homepage components
│   ├── Lembaga/                 # Lembaga components
│   ├── PotensiDusun/            # Potensi desa components
│   ├── Profil/                  # Profil components
│   ├── Sejarah/                 # Sejarah components
│   ├── Struktur/                # Struktur components
│   ├── VisiMisi/                # Visi Misi components
│   └── Admin/
│       ├── AdminLayout.jsx      # Admin layout
│       ├── Dashboard.jsx        # Admin dashboard
│       ├── LoginPage.jsx        # Admin login (TOTP)
│       ├── ProtectedRoute.jsx   # Route protection
│       ├── useAuthState.js      # Auth state hook
│       ├── ArticleForm.jsx      # Article CRUD form
│       ├── UmkmForm.jsx         # UMKM CRUD form
│       ├── StrukturForm.jsx     # Struktur CRUD form
│       ├── LembagaForm.jsx      # Lembaga CRUD form
│       ├── CarouselForm.jsx     # Carousel CRUD form
│       ├── AgendaForm.jsx       # Agenda CRUD form
│       ├── VideoForm.jsx        # Video CRUD form
│       ├── PhotoForm.jsx        # Photo CRUD form
│       ├── HayatiForm.jsx       # Hayati CRUD form
│       └── TogaForm.jsx         # TOGA CRUD form
├── pages/
│   ├── HomePage.jsx             # Beranda
│   ├── SemuaBeritaPage.jsx      # Daftar berita
│   ├── DetailArticlePage.jsx    # Detail artikel
│   ├── PotensiDusun.jsx         # Potensi desa
│   ├── DetailUmkmPage.jsx       # Detail UMKM
│   ├── DaftarUmkmPage.jsx       # Daftar UMKM
│   ├── Hayati.jsx               # Hayati & Non-hayati
│   ├── TogaDetailPage.jsx       # Detail TOGA
│   ├── AgendaPage.jsx           # Agenda
│   ├── LembagaMasyarakat.jsx    # Lembaga masyarakat
│   ├── StrukturPemerintahan.jsx # Struktur pemerintahan
│   ├── VisiMisi.jsx             # Visi & Misi
│   ├── Sejarah.jsx              # Sejarah
│   ├── KontakPage.jsx           # Kontak
│   └── GaleriPage.jsx           # Galeri
├── styles/
│   └── style.css                # Global styles
├── utils/
│   ├── api.js                   # API client (Firebase)
│   ├── firebase.js              # Firebase config
│   ├── config.js                # App configuration
│   ├── formatDate.js            # Date formatting
│   ├── imageUpload.js           # Image upload utilities
│   ├── kedungs.js               # Kedung data utilities
│   ├── share.js                 # Share utilities
│   ├── categories.js            # Category definitions
│   ├── developer.js             # Developer info
│   ├── api.test.js              # API tests
│   ├── share.test.js            # Share tests
│   ├── totp.test.js             # TOTP tests
│   └── truncateText.js          # Text truncation
└── public/
    ├── img/                     # Images
    ├── icons/                   # PWA icons
    └── robots.txt               # SEO robots
```

---

## 🌐 Deployment

### Vercel (Rekomendasi)

Proyek ini dideploy menggunakan **Vercel** dengan konfigurasi di `vercel.json`.

#### Deployment Otomatis (dari GitHub)
Setiap push ke branch `main` akan secara otomatis memicu deployment di Vercel.

#### Deployment Manual
```bash
# Pastikan sudah login ke Vercel
npx vercel login

# Deploy ke production
npx vercel --prod
```

#### Konfigurasi Vercel (`vercel.json`)
- **Headers**: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Rewrites**:
  - `/sitemap.xml` → `/api/sitemap`
  - `/rss.xml` → `/api/rss.xml`
  - `/(.*)` → `/index.html` (SPA fallback)

### Build Output
- Build command: `vite build`
- Output directory: `dist/`
- Node.js version: 20+

---

## 🔥 Konfigurasi Firebase

Proyek ini menggunakan **Firebase Realtime Database** dan **Firebase Authentication**.

### File Konfigurasi
- `.firebaserc` — Project ID: `kedung-api-7eaed`
- `firebase.json` — Konfigurasi database rules
- `database.rules.json` — Aturan keamanan database

### Inisialisasi Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
```

### Deploy Aturan Database
```bash
firebase deploy --only database
```

---

## 🔐 Environment Variables

Buat file `.env.local` di root proyek:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=admin@example.com
```

> **Catatan**: Semua variabel harus diawali dengan `VITE_` agar tersedia di sisi klien.

---

## 📜 Skrip

| Skrip | Deskripsi |
|-------|-----------|
| `npm run dev` | Jalankan development server (Vite) |
| `npm run build` | Build untuk produksi |
| `npm run preview` | Preview build produksi secara lokal |
| `npm run lint` | Jalankan ESLint |
| `npm test` | Jalankan unit test (Vitest) |

---

## 🛡️ Keamanan

- **CSP (Content Security Policy)**: Dikonfigurasi di `vercel.json` untuk mencegah XSS dan serangan lainnya
- **X-Frame-Options**: `DENY` — mencegah clickjacking
- **X-Content-Type-Options**: `nosniff` — mencegah MIME sniffing
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: Membatasi akses kamera, mikrofon, geolokasi, pembayaran, USB, dan autoplay
- **Admin Authentication**: TOTP (Time-based One-Time Password) untuk akses panel admin
- **Protected Routes**: Semua rute `/admin/*` dilindungi dengan `ProtectedRoute`
- **Firebase Database Rules**: Aturan keamanan database di `database.rules.json`

---

## 📱 PWA

Aplikasi ini mendukung Progressive Web App (PWA) dengan fitur:
- **Installable** — Dapat diinstal di home screen perangkat
- **Offline Support** — Cache aset dan halaman menggunakan Workbox
- **Push Notifications** — Didukung melalui service worker
- **Manifest** — Konfigurasi di `vite.config.js`

---

## 🤝 Berkontribusi

1. Fork repository ini
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "deskripsi fitur"`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buka Pull Request

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](LICENSE) untuk detail.

---

## 👥 Pengembang

- **Pengembang Utama**: Naufal ([@naufal54321](https://github.com/naufal54321))
- **Live Demo**: [https://kedung-guwosari.vercel.app](https://kedung-guwosari.vercel.app)
- **Repository**: [https://github.com/naufal54321/-kedung-web-profile](https://github.com/naufal54321/-kedung-web-profile)

---

*Dokumentasi ini dikelola oleh pengembang. Untuk pertanyaan atau dukungan, silakan buka issue di repository GitHub.*