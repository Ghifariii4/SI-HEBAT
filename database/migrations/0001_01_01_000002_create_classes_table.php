<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id(); // SERIAL PRIMARY KEY
            $table->string('name', 100);
            $table->integer('grade');
            $table->foreignUuid('homeroom_teacher_id')->nullable()->constrained('users');
        });

        // Parent Student Relationship
        Schema::create('parent_student', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('parent_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('student_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parent_student');
        Schema::dropIfExists('classes');
    }
};
