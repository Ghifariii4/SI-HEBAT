<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Extension
        DB::statement('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        // 2. Roles
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // SERIAL PRIMARY KEY
            $table->string('name', 50)->unique();
        });

        // Insert default roles
        DB::table('roles')->insert([
            ['name' => 'admin'],
            ['name' => 'siswa'],
            ['name' => 'guru'],
            ['name' => 'orang_tua'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
