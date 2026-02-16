<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user->hasRole('siswa')) {
        return redirect()->route('student.dashboard');
    } elseif ($user->hasRole('guru')) {
        return redirect()->route('guru.dashboard');
    } elseif ($user->hasRole('orang_tua')) {
        return redirect()->route('orangtua.dashboard');
    } elseif ($user->hasRole('admin')) {
        return redirect()->route('admin.dashboard'); // Jika ada route admin
    }
    return redirect('/'); // Fallback
})->middleware(['auth', 'verified'])->name('dashboard');

// Dashboard Per Role
Route::middleware(['auth', 'verified'])->group(function () {

    // ===== STUDENT ROUTES =====
    Route::prefix('siswa')->name('student.')->group(function () {
        // Dashboard
        Route::get('/dashboard', function () {
            return Inertia::render('Student/Dashboard');
        })->name('dashboard');

        // Profile
        Route::get('/profile', function () {
            return Inertia::render('Student/Profile');
        })->name('profile');

        // Leaderboard
        Route::get('/leaderboard', function () {
            return Inertia::render('Student/Leaderboard');
        })->name('leaderboard');

        // Shop
        Route::get('/shop', function () {
            return Inertia::render('Student/Shop');
        })->name('shop');

        // Habits
        Route::prefix('habit')->name('habit.')->group(function () {
            Route::get('/bangun', function () {
                return Inertia::render('Student/Habit/Bangun');
            })->name('bangun');

            Route::get('/beribadah', function () {
                return Inertia::render('Student/Habit/Beribadah');
            })->name('beribadah');

            Route::get('/olahraga', function () {
                return Inertia::render('Student/Habit/Olahraga');
            })->name('olahraga');

            Route::get('/makan', function () {
                return Inertia::render('Student/Habit/Makan');
            })->name('makan');

            Route::get('/belajar', function () {
                return Inertia::render('Student/Habit/Belajar');
            })->name('belajar');

            Route::get('/sosial', function () {
                return Inertia::render('Student/Habit/Sosial');
            })->name('sosial');

            Route::get('/tidur', function () {
                return Inertia::render('Student/Habit/Tidur');
            })->name('tidur');
        });
    });

    // ===== TEACHER ROUTES =====
    Route::get('/guru/dashboard', function () {
        return Inertia::render('Teacher/Dashboard');
    })->name('guru.dashboard');

    // ===== PARENT ROUTES =====
    Route::get('/orangtua/dashboard', function () {
        return Inertia::render('Parent/Dashboard');
    })->name('orangtua.dashboard');

    // ===== ADMIN ROUTES =====
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
