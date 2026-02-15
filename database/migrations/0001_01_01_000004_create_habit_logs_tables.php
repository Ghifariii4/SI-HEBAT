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
        Schema::create('habit_logs', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('uuid_generate_v4()'));
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('habit_id')->constrained('habits');
            $table->date('log_date');
            $table->integer('base_xp')->default(0);
            $table->integer('bonus_xp')->default(0);
            $table->integer('coin_earned')->default(0);
            $table->integer('star_earned')->default(0);
            $table->string('status', 20)->default('pending');
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['user_id', 'habit_id', 'log_date']);
            
            $table->index('user_id');
            $table->index('log_date');
            $table->index(['user_id', 'log_date']);
        });

        Schema::create('habit_log_details', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('habit_log_id')->constrained('habit_logs')->onDelete('cascade');
            $table->string('key', 100)->nullable();
            $table->text('value')->nullable();
        });

        Schema::create('approvals', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('uuid_generate_v4()'));
            $table->foreignUuid('habit_log_id')->constrained('habit_logs')->onDelete('cascade');
            $table->foreignUuid('approved_by')->nullable()->constrained('users');
            $table->string('status', 20);
            $table->text('note')->nullable();
            $table->timestamp('approved_at')->nullable();
            
            $table->index('habit_log_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approvals');
        Schema::dropIfExists('habit_log_details');
        Schema::dropIfExists('habit_logs');
    }
};
