<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserStat;
use App\Models\XpLedger;
use App\Models\CoinLedger;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Yaml\Yaml;

class GamificationService
{
    protected array $rules;

    public function __construct()
    {
        $this->rules = Yaml::parseFile(base_path('scoring_rules.yaml'));
    }

    public function updateUserStats(User $user)
    {
        $totalXp = XpLedger::where('user_id', $user->id)->sum('amount');
        $totalCoin = CoinLedger::where('user_id', $user->id)->sum('amount');
        $totalStars = HabitLog::where('user_id', $user->id)->where('status', 'approved')->sum('star_earned');

        $level = $this->calculateLevel($totalXp);
        $rank = $this->calculateRank($totalStars);
        $streak = $this->calculateStreak($user);

        UserStat::updateOrCreate(
            ['user_id' => $user->id],
            [
                'total_xp' => $totalXp,
                'total_coin' => $totalCoin,
                'current_level' => $level,
                'current_rank' => $rank,
                'current_star' => $totalStars,
                'current_streak' => $streak['current'],
                'longest_streak' => max($streak['current'], $user->stats->longest_streak ?? 0),
                'updated_at' => Carbon::now(),
            ]
        );
    }

    protected function calculateLevel(int $xp): int
    {
        // Simple leveling logic based on rules
        $level = 1;
        $remainingXp = $xp;

        while (true) {
            $required = $this->getXpForNextLevel($level);
            if ($remainingXp >= $required && $level < 100) {
                $remainingXp -= $required;
                $level++;
            } else {
                break;
            }
        }

        return $level;
    }

    protected function getXpForNextLevel(int $currentLevel): int
    {
        if ($currentLevel <= 10) return 500;
        if ($currentLevel <= 30) return 1000;
        if ($currentLevel <= 60) return 2500;
        return 5000;
    }

    protected function calculateRank(int $stars): string
    {
        $ranks = $this->rules['gamification']['ranks'];
        $currentRank = $ranks[0]['name'];

        foreach ($ranks as $rank) {
            if ($stars >= $rank['min_stars']) {
                $currentRank = $rank['name'];
            }
        }

        return $currentRank;
    }

    protected function calculateStreak(User $user): array
    {
        $logs = HabitLog::where('user_id', $user->id)
            ->where('status', 'approved')
            ->select('log_date')
            ->distinct()
            ->orderBy('log_date', 'desc')
            ->get();

        if ($logs->isEmpty()) return ['current' => 0];

        $currentStreak = 0;
        $today = Carbon::today();
        $lastLogDate = Carbon::parse($logs[0]->log_date);

        // If last log was not today or yesterday, streak is broken
        if (!$lastLogDate->isToday() && !$lastLogDate->isYesterday()) {
            return ['current' => 0];
        }

        $checkDate = $lastLogDate;
        foreach ($logs as $log) {
            $logDate = Carbon::parse($log->log_date);
            if ($logDate->equalTo($checkDate)) {
                $currentStreak++;
                $checkDate->subDay();
            } else {
                break;
            }
        }

        return ['current' => $currentStreak];
    }
}
