<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function show(Request $request)
    {
        $user = $request->user() ?? auth()->user();
        
        return Inertia::render('Student/Profile', [
            'user' => $user->only('id', 'nis', 'full_name', 'email', 'religion', 'class_id'),
            'status' => session('status'),
        ]);
    }

    /**
     * Update user's password.
     */
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        // Validate current password
        if (!Hash::check($request->input('current_password'), $user->password_hash)) {
            return back()->withErrors(['current_password' => 'Password saat ini tidak benar.']);
        }

        // Validate new password
        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'password.required' => 'Password baru harus diisi.',
            'password.min' => 'Password harus minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak sesuai.',
        ]);

        $user->update([
            'password_hash' => Hash::make($validated['password']),
        ]);

        return back()->with('status', 'Password berhasil diubah!');
    }
}
