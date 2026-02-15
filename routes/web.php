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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Dashboard Per Role
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/siswa/dashboard', function () {
        return Inertia::render('Student/Dashboard');
    })->name('siswa.dashboard');

    Route::get('/guru/dashboard', function () {
        return Inertia::render('Teacher/Dashboard');
    })->name('guru.dashboard');

    Route::get('/orangtua/dashboard', function () {
        return Inertia::render('Parent/Dashboard');
    })->name('orangtua.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
