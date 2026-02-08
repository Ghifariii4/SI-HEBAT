# Login & Register System - Setup Guide

## 📋 Overview
Sistem login dan register dengan 3 role berbeda:
- **Siswa**: Login dengan NIS
- **Guru**: Login dengan NIP (PNS) atau Nama Lengkap (Honorer)
- **Orangtua**: Login dengan Email + Self-Register

---

## 🗂️ File Structure

```
resources/js/Pages/
├── Landing.jsx (UPDATED - CTA buttons navigate to /login)
├── Auth/
│   ├── Login.jsx (NEW - Dynamic form based on role)
│   └── Register.jsx (NEW - For Parent registration)
└── Components/
    ├── NavBar.jsx
    ├── HabitCard.jsx
    └── FooterSection.jsx
```

---

## 🔀 Routing Setup (Laravel + Inertia.js)

### File: `routes/web.php`

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
    
    Route::get('/register', [RegisterController::class, 'show'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    // Protected routes here
});
```

---

## 🛠️ Laravel Controller Setup

### File: `app/Http/Controllers/LoginController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|in:siswa,guru,orangtua',
            'password' => 'required|min:6',
            'nis' => 'required_if:role,siswa',
            'nip' => 'required_if:guru_type,pns',
            'nama_lengkap' => 'required_if:guru_type,honorer',
            'email' => 'required_if:role,orangtua|email',
        ]);

        // Implement authentication logic here based on role
        // Use the role and other fields to authenticate users

        return redirect()->route('dashboard');
    }

    public function logout()
    {
        \Auth::logout();
        return redirect('/');
    }
}
```

### File: `app/Http/Controllers/RegisterController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class RegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'nis_anak' => 'required|string|unique:users,nis_anak',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['nama_lengkap'],
            'email' => $validated['email'],
            'nis_anak' => $validated['nis_anak'],
            'role' => 'orangtua',
            'password' => bcrypt($validated['password']),
        ]);

        \Auth::login($user);
        return redirect()->route('dashboard');
    }
}
```

---

## 📱 Frontend Features

### ✅ Login Page Features:
- 3 Role Selector (Siswa, Guru, Orangtua)
- Dynamic form based on role
- Guru toggle (PNS / Honorer)
- Form validation with error messages
- Smooth animations (Framer Motion)
- "Daftar sekarang" link (only visible for Orangtua)
- Back to home link

### ✅ Register Page Features:
- 4 input fields (Nama, Email, NIS Anak, Password)
- Password confirmation
- Form validation
- Link to login
- Back to home link

---

## 🎨 Styling

### Colors:
- **Primary Green**: `#22C55E` (green-600)
- **Emerald**: `#059669` (emerald-600)
- **Yellow Accent**: `#FACC15` (yellow-400)

### Typography:
- **Header**: Poppins / Nunito (Chaotic Good vibes)
- **Body**: Inter (current)

### Background:
- Full-height with background image blur
- Dark overlay (60% opacity)
- Glass-morphism effect on card

---

## 🚀 Next Steps

1. Create Laravel controllers (LoginController, RegisterController)
2. Set up authentication middleware
3. Create User model with role field
4. Implement role-based redirects
5. Add dashboard pages for each role
6. Test login flow end-to-end

---

## 📝 Notes

- **Siswa & Guru**: Use school-provided credentials (automatic registration)
- **Orangtua**: Self-register with email + child's NIS
- No hardcoded users - all validation in backend
- All routes protected with middleware

---

Updated: 8 Feb 2025
