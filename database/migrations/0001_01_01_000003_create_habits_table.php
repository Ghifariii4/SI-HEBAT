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
        Schema::create('habits', function (Blueprint $table) {
            $table->id(); // SERIAL PRIMARY KEY
            $table->string('code', 50)->unique();
            $table->string('name', 100);
            $table->integer('max_star')->default(1);
        });

        // Insert default habits
        DB::table('habits')->insert([
            ['code' => 'bangun_pagi', 'name' => 'Bangun Pagi'],
            ['code' => 'ibadah', 'name' => 'Beribadah'],
            ['code' => 'olahraga', 'name' => 'Olahraga'],
            ['code' => 'makan_sehat', 'name' => 'Makan Sehat'],
            ['code' => 'belajar', 'name' => 'Gemar Belajar'],
            ['code' => 'sosial', 'name' => 'Sosial'],
            ['code' => 'tidur', 'name' => 'Tidur Cepat'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habits');
    }
};
