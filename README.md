# 🎓 Si Hebat - Landing Page Website

> Platform edukasi interaktif yang menginspirasi anak Indonesia untuk membangun karakter melalui 7 kebiasaan positif.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## ✨ Fitur Utama

### 🎨 **Desain Duolingo-Like**

- Visual ceria, friendly, dan playful
- Warna hijau cerah (Duolingo style) dengan accent kuning dan biru
- Banyak ilustrasi flat dan emoji style
- Rounded corners besar untuk tampilan modern
- Animasi smooth di setiap interaksi

### 🌓 **Dark Mode**

- Toggle dark/light mode yang tersimpan di localStorage
- Smooth transition antar tema (300ms)
- Otomatis mengikuti preferensi sistem jika belum ada pilihan

### 📱 **Fully Responsive**

- Mobile First Design
- Optimal di desktop, tablet, dan mobile
- Touch-friendly buttons dan spacing

### ⚡ **Smooth Animations**

- Framer Motion untuk animasi profesional
- Fade-in & slide-up saat scroll
- Hover effects pada cards dan buttons
- Floating elements di background

---

## 📸 Preview & Demo

**Lihat preview langsung**: Buka file [landing-demo.html](./landing-demo.html) di browser Anda tanpa perlu setup apapun!

---

## 🏗️ Struktur Proyek

```
SI-HEBAT/
├── 📁 resources/
│   └── js/
│       ├── Pages/
│       │   └── Landing.jsx              # Main landing page component
│       ├── Components/
│       │   ├── NavBar.jsx               # Navigation + Dark mode toggle
│       │   ├── HabitCard.jsx            # Reusable habit card
│       │   ├── FooterSection.jsx        # Footer component
│       │   └── Button.jsx               # Shadcn Button component
│       └── Hooks/
│           └── useCustomHooks.js        # Custom React hooks
├── 📁 public/
│   └── images/
│       └── smkn8.jpeg                   # Logo sekolah
├── 📄 landing-demo.html                 # Standalone HTML demo (BISA DIBUKA LANGSUNG)
├── 📄 tailwind.config.js                # Tailwind CSS config
├── 📄 postcss.config.js                 # PostCSS config
├── 📄 package.json                      # Dependencies
├── 📄 SETUP_GUIDE.md                    # Panduan setup lengkap
└── 📄 README.md                         # File ini
```

---

## 🚀 Quick Start

### Option 1: Preview Demo HTML (Tercepat) ⭐

```bash
# Buka file ini langsung di browser Anda
landing-demo.html
```

Tidak perlu setup apapun! File HTML sudah standalone dan memiliki semua fitur:

- ✅ Dark mode toggle
- ✅ Smooth scroll navigation
- ✅ Responsive design
- ✅ Semua 7 kebiasaan
- ✅ Footer lengkap

### Option 2: Setup React Project (Dengan Laravel)

#### Prerequisites

- Node.js >= 18
- PHP >= 8.2
- Composer
- PostgreSQL (optional, bisa pakai SQLite)
- Docker (optional, untuk Laravel Sail)
  ./vendor/bin/sail artisan key:generate

````

#### Konfigurasi Database (.env)

Project ini menggunakan PostgreSQL.

**Untuk Development (Lokal):** Gunakan konfigurasi bawaan Docker (Sail).

```env
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=postgres
DB_PASSWORD=postgres
````

**Untuk Production (Server):** Ubah `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` sesuai kredensial server kalian.

Setelah `.env` siap, jalankan migrasi:

```bash
./vendor/bin/sail artisan migrate
```

(Opsional: Jika ingin mengisi data dummy)

```bash
./vendor/bin/sail artisan db:seed
```

### 3. Setup Shadcn UI (PENTING)

Shadcn UI butuh inisialisasi CLI sebelum komponen bisa dipakai. Pastikan kamu berada di dalam container Docker atau gunakan sail prefix:

```bash
# Jalankan perintah ini di terminal
./vendor/bin/sail npx shadcn-ui@latest init
```

Pertanyaan yang muncul (Pilih ini):

- **Would you like to use TypeScript?** → No
- **Which style would you like to use?** → New York
- **Which color would you like to use as base color?** → Zinc
- **Where is your global CSS file?** → `resources/css/app.css`
- **Do you want to use CSS variables for colors?** → Yes
- **Where is your tailwind.config.js located?** → `tailwind.config.js`
- **Configure the import alias for components:** → `@/Components`
- **Configure the import alias for utils:** → `@/Utils`

### 4. Menjalankan Aplikasi

Buka 2 Terminal berbeda (atau gunakan fitur split terminal di VS Code):

**Terminal 1 (Backend & Server):**

```bash
./vendor/bin/sail up
```

(Tunggu hingga muncul tulisan `Server running on [http://0.0.0.0:80]`)

**Terminal 2 (Frontend Compilation / Vite):**

```bash
./vendor/bin/sail npm run dev
```

Ini wajib jalan agar fitur Hot Reload (perubahan tampilan langsung muncul) dan Inertia berfungsi lancar.

**Sekarang buka browser:** http://localhost

## 🧩 Fitur Utama & Cara Pakai

### Menambahkan Komponen Shadcn UI

Karena Shadcn bersifat "copy-paste", gunakan CLI untuk menambah komponen baru ke project:

```bash
./vendor/bin/sail npx shadcn-ui@latest add button card dialog
```

Komponen akan otomatis muncul di folder `resources/js/Components/ui`.

### Membuat Halaman Baru (Inertia)

Gunakan perintah artisan untuk membuat komponen React:

```bash
./vendor/bin/sail artisan inertia:component HalamanBaru
```

File baru akan dibuat di `resources/js/Pages/HalamanBaru.jsx`.

### Menggunakan Framer Motion

Import di dalam komponen React kamu:

```jsx
import { motion } from "framer-motion";

// Contoh penggunaan
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Konten kamu di sini
</motion.div>;
```

## 🛠 Cheat Sheet Perintah

| Kegunaan                 | Perintah                                          |
| ------------------------ | ------------------------------------------------- |
| Jalankan Docker (Sail)   | `./vendor/bin/sail up`                            |
| Matikan Docker           | `./vendor/bin/sail down`                          |
| Install Library PHP      | `./vendor/bin/sail composer require nama-package` |
| Install Library NPM      | `./vendor/bin/sail npm install nama-package`      |
| Clear Cache Laravel      | `./vendor/bin/sail artisan optimize:clear`        |
| Run Migrasi              | `./vendor/bin/sail artisan migrate:fresh --seed`  |
| Masuk ke Container Shell | `./vendor/bin/sail shell`                         |

## 🐛 Troubleshooting

**Q: Error Connection refused saat migrate?**  
A: Pastikan Docker Desktop sedang berjalan. Cek service postgres sudah up dengan perintah `./vendor/bin/sail ps`.

**Q: Tampilan putih kosong / CSS tidak muncul?**  
A: Pastikan terminal kedua menjalankan `./vendor/bin/sail npm run dev`. Cek juga `vite.config.js` sudah sesuai panduan setup.

**Q: Komponen Shadcn error Module not found?**  
A: Pastikan kamu sudah menjalankan langkah **Setup Shadcn UI (Step 3)** di atas dan alias `@` sudah benar di `vite.config.js` dan `tailwind.config.js`.

## 👥 Kontributor

- **Ahmad Ghifari** - Lead Developer
- **Junior Ferdiansyah** - Frontend (React/Shadcn)
- **Alfarisi Azmir** - Backend & Database

## 📝 Lisensi

Copyright © 2025 Tim 7 Kebiasaan Anak Indonesia Hebat.
