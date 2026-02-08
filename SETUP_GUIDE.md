# 🚀 Si Hebat - Landing Page Setup Guide By KINGZ

## 📋 Project Overview

**Si Hebat** adalah platform edukasi interaktif yang dirancang untuk membentuk karakter anak Indonesia melalui 7 kebiasaan positif. Desain website terinspirasi dari Duolingo dengan penuh warna, animasi menarik, dan antarmuka yang user-friendly.

### 🎯 Target Pengguna

- Siswa SMKN 8 Jakarta
- Platform edukasi karakter berbasis web

### 🌟 7 Kebiasaan Utama

1. **Bangun Pagi** - Memulai hari dengan segar, ceria, dan disiplin
2. **Beribadah** - Selalu berdoa dan mendekatkan diri pada Tuhan
3. **Berolahraga** - Menjaga kebugaran fisik dan kesehatan mental
4. **Makan Sehat & Bergizi** - Memenuhi nutrisi tubuh agar kuat dan sehat
5. **Gemar Belajar** - Meningkatkan pengetahuan dan kemampuan
6. **Bermasyarakat** - Peduli, gotong royong, dan aktif dalam kehidupan sosial
7. **Tidur Cukup** - Istirahat konsisten untuk memaksimalkan tumbuh kembang

---

## 🛠️ Tech Stack (WAJIB)

| Komponen             | Teknologi                       |
| -------------------- | ------------------------------- |
| **Frontend**         | React.js + Inertia.js (SPA)     |
| **Backend**          | Laravel 12                      |
| **UI Framework**     | Shadcn UI + Tailwind CSS        |
| **Animasi**          | Framer Motion                   |
| **Database**         | PostgreSQL                      |
| **Containerization** | Docker + Laravel Sail           |
| **Responsive**       | Mobile First (Desktop & Mobile) |

---

## 📁 Project Structure

```
SI-HEBAT/
├── resources/
│   └── js/
│       ├── Pages/
│       │   └── Landing.jsx          # Main landing page component
│       └── Components/
│           ├── NavBar.jsx            # Navigation bar dengan dark mode toggle
│           ├── HabitCard.jsx         # Individual habit card component
│           └── FooterSection.jsx     # Footer dengan informasi sekolah
├── public/
│   ├── images/
│   │   └── smkn8.jpeg               # Logo sekolah SMKN 8 Jakarta
│   └── ...
├── landing-demo.html                # Standalone HTML demo untuk preview
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # NPM dependencies
└── ...
```

---

## 📦 Dependencies yang Diperlukan

### Core Dependencies

```bash
npm install react react-dom
npm install @inertiajs/react @inertiajs/core
npm install framer-motion
npm install tailwindcss postcss autoprefixer
npm install lucide-react
```

### Development Dependencies

```bash
npm install -D @tailwindcss/forms
npm install -D typescript @types/react @types/node
npm install -D vite
```

---

## 🚀 Setup Instructions

### 1. **Install Laravel Project**

```bash
# Clone atau buat Laravel 12 project
composer create-project laravel/laravel si-hebat "^12.0"
cd si-hebat
```

### 2. **Setup Database (PostgreSQL)**

```.env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=si_hebat
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### 3. **Install Dependencies**

```bash
composer install
npm install
```

### 4. **Install Required Packages**

```bash
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms
```

### 5. **Setup React + Inertia (if not already configured)**

```bash
composer require inertiajs/inertia-laravel
php artisan inertia:install-ssr
npm install @inertiajs/react @inertiajs/vue3
```

### 6. **Migrate Database**

```bash
php artisan migrate
```

### 7. **Build Assets**

```bash
npm run build        # Production build
npm run dev          # Development with hot reload
```

### 8. **Run Development Server**

```bash
php artisan serve
npm run dev          # Separate terminal
```

Visit: `http://localhost:8000`

---

## 🎨 Gaya Desain (Duolingo-Like)

### Color Palette

| Warna           | Hex Code  | Penggunaan           |
| --------------- | --------- | -------------------- |
| Hijau (Primary) | `#22c55e` | CTA, Accent utama    |
| Putih           | `#ffffff` | Background utama     |
| Kuning (Accent) | `#fbbf24` | Highlight, Secondary |
| Biru (Accent)   | `#3b82f6` | Variasi card         |
| Dark BG         | `#18181b` | Dark mode background |

### Design Principles

- ✨ **Visual ceria & playful** - Friendly untuk semua usia
- 🎭 **Mirip Duolingo** - Layout spacing & vibe
- 🎨 **Banyak animasi halus** - Hover effects, scroll animations
- 📱 **Mobile First** - Responsive design
- 🟠 **Rounded corners besar** - `rounded-2xl` / `rounded-3xl`
- 💫 **Soft shadows** - Halus dan natural
- 📝 **Font besar & mudah dibaca** - Untuk siswa SMKN
- ⚪ **Banyak whitespace** - Layout yang clean

---

## 🌓 Global Features (WAJIB ADA)

### 1. **Dark Mode Toggle**

- ✅ Menggunakan Tailwind Dark Mode (class strategy)
- ✅ Tombol toggle icon Sun/Moon
- ✅ Preferensi disimpan di localStorage
- ✅ Smooth transition antar tema (300ms)

**Implementasi:**

```jsx
// Di NavBar.jsx
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);
```

### 2. **Smooth Scroll Navigation**

- ✅ Smooth scroll antar section
- ✅ Klik menu → scroll halus ke section tujuan
- ✅ Mendukung fixed navbar dengan offset
- ✅ CSS scroll-behavior + JS helper

**Implementasi:**

```jsx
// Smooth scroll helper function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80;
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};
```

---

## 📄 Landing Page Structure (WAJIB ADA)

### 1️⃣ **HERO SECTION**

- Ilustrasi siswa Indonesia (+ animasi)
- Headline: "Bangun Karakter Hebat Sejak Dini 🇮🇩"
- Subheadline: Platform edukasi interaktif...
- 2 CTA Buttons: "Mulai Jadi Hebat" & "Lihat Kebiasaan"
- Background decoration dengan blur circles
- Scroll indicator (animated chevron)

### 2️⃣ **HABITS SECTION**

- 7 Interactive cards (grid layout: 4 columns di desktop, responsive di mobile)
- Setiap card:
  - Icon emoji (large)
  - Judul kebiasaan
  - Deskripsi singkat
  - "Pelajari →" label
- Hover effects: scale + shadow
- Animasi float pada icons
- Modal/Detail page accessible via Inertia Link

### 3️⃣ **CTA BESAR (FINAL CALL)**

- Background: Green gradient (Duolingo vibes)
- Teks: "Yuk, Ciptakan Anak Indonesia Hebat!"
- CTA Button: "Mulai Menjadi Si Hebat Sekarang!"
- Eye-catching design dengan shadow

### 4️⃣ **FOOTER**

- Logo SMKN 8 Jakarta
- Copyright: © 2025 Tim 7 Kebiasaan Anak Indonesia Hebat
- **Kontak Sekolah:**
  - 📞 +62 21-7996493
  - 📧 info@smkn8jakarta.sch.id
  - 🌐 https://smkn8jakarta.sch.id
- **Tim Pengembang:**
  - Ahmad Ghifari - Lead Developer
  - Junior Ferdiansyah - Frontend (React / Shadcn)
  - Alfarisi Azmir - Backend & Database
- Tech Stack info

---

## 🎬 Animasi (Framer Motion)

### Hero Section

```jsx
// Fade-in & slide-up animation
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
```

### Habit Cards

```jsx
// Scale on hover + shadow
motion.div
  whileHover={{ scale: 1.05, y: -8 }}
  whileTap={{ scale: 0.98 }}
```

### Background Decoration

```jsx
// Floating animation
animate={{ y: [0, 30, 0] }}
transition={{ duration: 8, repeat: Infinity }}
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Mobile-First Approach

```jsx
// Grid responsif
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 📝 File Paths (Landing Component)

| File           | Path                                        | Tujuan                                  |
| -------------- | ------------------------------------------- | --------------------------------------- |
| Main Component | `resources/js/Pages/Landing.jsx`            | Main landing page                       |
| NavBar         | `resources/js/Components/NavBar.jsx`        | Navigation + Dark mode toggle           |
| Habit Card     | `resources/js/Components/HabitCard.jsx`     | Reusable habit card                     |
| Footer         | `resources/js/Components/FooterSection.jsx` | Footer section                          |
| CSS Config     | `tailwind.config.js`                        | Tailwind CSS configuration              |
| PostCSS Config | `postcss.config.js`                         | PostCSS plugins                         |
| Demo HTML      | `landing-demo.html`                         | Standalone demo (dapat diview langsung) |

---

## 🧪 Testing & Deployment

### Local Testing

```bash
# Dev server dengan hot reload
npm run dev

# Build production
npm run build

# Serve production build
npm run preview
```

### Docker (Laravel Sail)

```bash
./vendor/bin/sail up -d

# Lihat logs
./vendor/bin/sail logs -f

# Run migrations
./vendor/bin/sail artisan migrate
```

### Deployment Checklist

- [ ] Database migrations di production
- [ ] Environment variables `.env` dikonfigurasi
- [ ] Assets dioptimasi & build
- [ ] Security: CSRF tokens, rate limiting
- [ ] Dark mode preference tersimpan
- [ ] Mobile responsiveness ditest
- [ ] All animations smooth di semua browser

---

## 🔗 Useful Links

- **Duolingo Design** (Inspiration): https://www.duolingo.com/
- **Tailwind CSS Docs**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **React Docs**: https://react.dev/
- **Laravel Docs**: https://laravel.com/docs/
- **Inertia.js**: https://inertiajs.com/
- **Shadcn UI**: https://shadcn-ui.com/

---

## 👥 Tim Pengembang

| Nama               | Role                      |
| ------------------ | ------------------------- |
| Ahmad Ghifari      | Lead Developer            |
| Junior Ferdiansyah | Frontend (React / Shadcn) |
| Alfarisi Azmir     | Backend & Database        |

**School**: SMKN 8 Jakarta  
**Year**: 2025  
**Project**: 7 Kebiasaan Anak Indonesia Hebat

---

## 📞 Support

Untuk pertanyaan & support:

- 📧 info@smkn8jakarta.sch.id
- 📱 +62 21-7996493
- 🌐 https://smkn8jakarta.sch.id

---

**Built with ❤️ untuk generasi Indonesia yang hebat** 🇮🇩
