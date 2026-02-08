# 🚀 7 Kebiasaan Anak Indonesia Hebat

Platform edukasi interaktif yang dibangun untuk mencetak generasi muda Indonesia yang berkarakter. Menggabungkan kekuatan backend Laravel dengan keindahan UI modern React.

## 🌟 Tech Stack Highlights

- **Backend:** Laravel 12
- **Frontend:** React.js + Inertia.js (SPA)
- **UI Framework:** Shadcn UI + Tailwind CSS
- **Animation:** Framer Motion
- **Database:** PostgreSQL (Local via Docker / Remote Server)
- **Orchestration:** Laravel Sail (Docker)

## 📋 Prasyarat (Wajib)

Sebelum memulai, pastikan laptop kamu sudah terinstall:

- Docker Desktop (Sedang running di background)
- Visual Studio Code + Extension Dev Containers (Rekomendasi) atau cukup Terminal biasa
- Git

## 🏃‍♂️ Quick Start (Setup dari 0)

Ikuti langkah ini persis seperti urutannya agar tidak ada error.

### 1. Clone & Install Dependencies

Buka terminal dan jalankan perintah berikut:

```bash
# 1. Clone repository
git clone https://github.com/username-anda/7-kebiasaan-anak.git
cd 7-kebiasaan-anak

# 2. Install Backend Dependencies (Laravel)
./vendor/bin/sail composer install

# 3. Install Frontend Dependencies (React, Shadcn, Framer Motion)
./vendor/bin/sail npm install
```

### 2. Setup Environment & Database

Copy file environment dan sesuaikan konfigurasi database.

```bash
# Copy file .env
cp .env.example .env

# Generate Application Key
./vendor/bin/sail artisan key:generate
```

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
```

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
</motion.div>
```

## 🛠 Cheat Sheet Perintah

| Kegunaan | Perintah |
|----------|----------|
| Jalankan Docker (Sail) | `./vendor/bin/sail up` |
| Matikan Docker | `./vendor/bin/sail down` |
| Install Library PHP | `./vendor/bin/sail composer require nama-package` |
| Install Library NPM | `./vendor/bin/sail npm install nama-package` |
| Clear Cache Laravel | `./vendor/bin/sail artisan optimize:clear` |
| Run Migrasi | `./vendor/bin/sail artisan migrate:fresh --seed` |
| Masuk ke Container Shell | `./vendor/bin/sail shell` |

## 🐛 Troubleshooting

**Q: Error Connection refused saat migrate?**  
A: Pastikan Docker Desktop sedang berjalan. Cek service postgres sudah up dengan perintah `./vendor/bin/sail ps`.

**Q: Tampilan putih kosong / CSS tidak muncul?**  
A: Pastikan terminal kedua menjalankan `./vendor/bin/sail npm run dev`. Cek juga `vite.config.js` sudah sesuai panduan setup.

**Q: Komponen Shadcn error Module not found?**  
A: Pastikan kamu sudah menjalankan langkah **Setup Shadcn UI (Step 3)** di atas dan alias `@` sudah benar di `vite.config.js` dan `tailwind.config.js`.

## 👥 Kontributor

- **Ahmad Ghifari** - Lead Developer
- **Junior Ferdiansyah** - Frontend Specialist (React/Shadcn)
- **Alfarisi Azmir** - Backend & Database

## 📝 Lisensi

Copyright © 2024 Tim 7 Kebiasaan Anak Indonesia Hebat.
