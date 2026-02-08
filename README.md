<<<<<<< HEAD
# 🎓 Si Hebat - Landing Page Website

> Platform edukasi interaktif yang menginspirasi anak Indonesia untuk membangun karakter melalui 7 kebiasaan positif.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

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
=======
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
>>>>>>> 24cc638 (Initial setup: Laravel Sail, React, Inertia, and Shadcn UI)
