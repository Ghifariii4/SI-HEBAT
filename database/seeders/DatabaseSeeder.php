<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::create([
            'role_id' => 1,
            'full_name' => 'Administrator',
            'email' => 'admin@hebat.com',
            'password_hash' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Siswa
        User::create([
            'role_id' => 2,
            'nis' => '12345678',
            'full_name' => 'Siswa Hebat',
            'password_hash' => Hash::make('password'),
            'religion' => 'Islam',
            'email_verified_at' => now(),
        ]);

        // Guru PNS
        User::create([
            'role_id' => 3,
            'nip' => '198701012010011001',
            'full_name' => 'Guru PNS Hebat',
            'password_hash' => Hash::make('password'),
            'religion' => 'Islam',
            'email_verified_at' => now(),
        ]);

        // Guru Honorer
        User::create([
            'role_id' => 3,
            'full_name' => 'Guru Honorer Hebat',
            'password_hash' => Hash::make('password'),
            'religion' => 'Kristen',
            'email_verified_at' => now(),
        ]);

        // Orang Tua
        User::create([
            'role_id' => 4,
            'email' => 'ortu@hebat.com',
            'full_name' => 'Orang Tua Hebat',
            'password_hash' => Hash::make('password'),
            'religion' => 'Islam',
            'email_verified_at' => now(),
        ]);
    }
}
