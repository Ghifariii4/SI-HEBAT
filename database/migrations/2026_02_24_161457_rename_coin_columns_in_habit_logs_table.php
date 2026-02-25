<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ensure the habit_logs table has the correct 'coin_earned' column.
     * (This migration is a safety-net for fresh installs where the old schema
     * used base_coin/bonus_coin. On updated installs, coin_earned already exists.)
     */
    public function up(): void
    {
        Schema::table('habit_logs', function (Blueprint $table) {
            // Add coin_earned if it doesn't exist (fresh installs from old migration)
            if (!Schema::hasColumn('habit_logs', 'coin_earned')) {
                if (Schema::hasColumn('habit_logs', 'base_coin')) {
                    $table->renameColumn('base_coin', 'coin_earned');
                } else {
                    $table->integer('coin_earned')->default(0)->after('bonus_xp');
                }
            }

            // Drop bonus_coin if it still exists
            if (Schema::hasColumn('habit_logs', 'bonus_coin')) {
                $table->dropColumn('bonus_coin');
            }
        });
    }

    public function down(): void
    {
        Schema::table('habit_logs', function (Blueprint $table) {
            if (Schema::hasColumn('habit_logs', 'coin_earned')) {
                $table->renameColumn('coin_earned', 'base_coin');
            }
            if (!Schema::hasColumn('habit_logs', 'bonus_coin')) {
                $table->integer('bonus_coin')->default(0);
            }
        });
    }
};
