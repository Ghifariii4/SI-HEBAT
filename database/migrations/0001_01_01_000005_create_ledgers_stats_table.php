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
        Schema::create('xp_ledger', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('uuid_generate_v4()'));
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('source_type', 50)->nullable();
            $table->uuid('source_id')->nullable();
            $table->integer('amount');
            $table->timestamp('created_at')->useCurrent();
            
            $table->index('user_id');
        });

        Schema::create('coin_ledger', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('uuid_generate_v4()'));
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('source_type', 50)->nullable();
            $table->uuid('source_id')->nullable();
            $table->integer('amount');
            $table->timestamp('created_at')->useCurrent();
            
            $table->index('user_id');
        });

        Schema::create('user_stats', function (Blueprint $table) {
            $table->foreignUuid('user_id')->primary()->constrained('users')->onDelete('cascade');
            $table->bigInteger('total_xp')->default(0);
            $table->bigInteger('total_coin')->default(0);
            $table->integer('current_level')->default(1);
            $table->string('current_rank', 50)->nullable();
            $table->integer('current_star')->default(0);
            $table->integer('current_streak')->default(0);
            $table->integer('longest_streak')->default(0);
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_stats');
        Schema::dropIfExists('coin_ledger');
        Schema::dropIfExists('xp_ledger');
    }
};
