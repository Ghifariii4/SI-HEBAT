<?php

namespace App\Services;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\HabitLogDetail;
use App\Models\User;
use App\Models\XpLedger;
use App\Models\CoinLedger;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Yaml\Yaml;

class HabitService
{
    protected array $rules;

    public function __construct()
    {
        $this->rules = Yaml::parseFile(base_path('scoring_rules.yaml'));
    }

    public function submitHabit(User $user, string $habitCode, array $data = [])
    {
        $habit = Habit::where('code', $habitCode)->firstOrFail();
        $now = Carbon::now();
        $today = $now->toDateString();

        // 1. Check if already submitted today
        $existing = HabitLog::where('user_id', $user->id)
            ->where('habit_id', $habit->id)
            ->where('log_date', $today)
            ->first();

        if ($existing) {
            throw new \Exception("Kamu sudah mengisi kebiasaan ini hari ini.");
        }

        // 2. Calculate points
        $points = $this->calculatePoints($habitCode, $now, $data);

        return DB::transaction(function () use ($user, $habit, $today, $points, $data) {
            // 3. Create Log
            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'log_date' => $today,
                'base_xp' => $points['xp'],
                'bonus_xp' => $points['bonus_xp'] ?? 0,
                'coin_earned' => $points['coin'],
                'star_earned' => $points['star'] ?? 0,
                'status' => ($points['needs_approval'] ?? false) ? 'pending' : 'approved',
            ]);

            // 4. Save Details
            foreach ($data as $key => $value) {
                if (is_array($value)) $value = json_encode($value);
                HabitLogDetail::create([
                    'habit_log_id' => $log->id,
                    'key' => $key,
                    'value' => (string) $value,
                ]);
            }

            // 5. Update Ledger if approved
            if ($log->status === 'approved') {
                $this->creditPoints($user, $log);
            }

            return $log;
        });
    }

    protected function calculatePoints(string $habitCode, Carbon $now, array $data): array
    {
        $habitRules = $this->rules['habits'][$habitCode] ?? null;
        if (!$habitRules) return ['xp' => 0, 'coin' => 0];

        $xp = 0;
        $coin = 0;
        $needs_approval = false;

        switch ($habitCode) {
            case 'bangun_pagi':
                $time = $now->format('H:i');
                $isWeekend = $now->isWeekend();
                $onTimeLimit = $isWeekend ? $habitRules['time_windows']['on_time']['weekend'] : $habitRules['time_windows']['on_time']['weekday'];
                
                if ($time <= $onTimeLimit) {
                    $xp = $habitRules['points']['on_time']['xp'];
                    $coin = $habitRules['points']['on_time']['coin'];
                } else if ($time <= $habitRules['time_windows']['valid']['end']) {
                    $xp = $habitRules['points']['late']['xp'];
                    $coin = $habitRules['points']['late']['coin'];
                }

                // Extra actions bonus
                $extraCount = !empty($data['extra_actions']) && is_array($data['extra_actions']) ? count($data['extra_actions']) : 0;
                if (!empty($data['note'])) {
                    $extraCount++;
                }

                if ($extraCount > 0) {
                    $xp += $extraCount * ($habitRules['extras']['action_bonus'] ?? 10);
                }
                break;

            case 'olahraga':
                $xp = $habitRules['points']['check_in'];
                $duration = min($data['duration'] ?? 0, $habitRules['limits']['max_minutes']);
                $xp += floor($duration / 5) * $habitRules['points']['per_5_minutes'];
                if (!empty($data['photo'])) $needs_approval = true;
                break;

            case 'makan_sehat':
                if (($data['checklist_count'] ?? 0) >= 4) {
                    $xp = $habitRules['points']['complete'];
                }
                $water = min($data['water_glasses'] ?? 0, $habitRules['limits']['max_water_glasses']);
                $xp += $water * $habitRules['points']['per_water_glass'];
                break;

            case 'tidur':
                $time = $now->format('H:i');
                $targetEnd = $habitRules['time_windows']['target']['end'];
                if ($time <= $targetEnd) {
                    $xp = $habitRules['points']['on_time'];
                } else {
                    // Penalty logic
                    $diffMinutes = Carbon::createFromFormat('H:i', $time)->diffInMinutes(Carbon::createFromFormat('H:i', $targetEnd));
                    $penalty = floor($diffMinutes / 6) * abs($habitRules['points']['late_penalty']);
                    $xp = max(0, $habitRules['points']['on_time'] - $penalty);
                }
                break;

            default:
                $xp = $habitRules['points']['check_in'] ?? 0;
                break;
        }

        return [
            'xp' => $xp,
            'coin' => $coin,
            'needs_approval' => $needs_approval,
            'star' => 1, // Default 1 star per habit for now
        ];
    }

    public function creditPoints(User $user, HabitLog $log)
    {
        if ($log->base_xp > 0) {
            XpLedger::create([
                'user_id' => $user->id,
                'source_type' => 'habit_log',
                'source_id' => $log->id,
                'amount' => $log->base_xp,
            ]);
        }

        if ($log->coin_earned > 0) {
            CoinLedger::create([
                'user_id' => $user->id,
                'source_type' => 'habit_log',
                'source_id' => $log->id,
                'amount' => $log->coin_earned,
            ]);
        }

        // Trigger stat update
        app(GamificationService::class)->updateUserStats($user);
    }
}
