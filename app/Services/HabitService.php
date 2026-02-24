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

    // --- Anti-cheat: Whitelisted tasks per religion (must match frontend IDs exactly) ---
    protected array $validTasks = [
        'islam'    => ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya', 'tilawah', 'puasa'],
        'kristen'  => ['saat_teduh', 'baca_alkitab', 'ibadah_mingguan', 'doa_malam'],
        'katolik'  => ['misa_kudus', 'doa_rosario', 'baca_kitab_suci', 'angelus'],
        'hindu'    => ['tri_sandhya', 'panca_sembah', 'dharmasastra', 'sewa_bakti'],
        'buddha'   => ['puja_bakti', 'meditasi', 'baca_sutta', 'dana_punna'],
        'konghucu' => ['kebaktian_harian', 'pembacaan_sishu', 'penghormatan_leluhur', 'amal_kebajikan'],
    ];

    // --- Prayer time windows for Islam (start and end in 'H:i') ---
    // Users may mark a prayer 60 minutes BEFORE its window starts (preparation allowance)
    // but not after its window has ended.
    protected array $prayerWindows = [
        'subuh'   => ['start' => '04:00', 'end' => '05:30'],
        'dzuhur'  => ['start' => '11:30', 'end' => '14:30'],
        'ashar'   => ['start' => '14:45', 'end' => '18:00'],
        'maghrib' => ['start' => '17:45', 'end' => '19:30'],
        'isya'    => ['start' => '19:00', 'end' => '03:30'],  // crosses midnight
    ];

    protected array $validReligions = ['islam', 'kristen', 'katolik', 'hindu', 'buddha', 'konghucu'];

    /**
     * Validate beribadah submission data to prevent cheating.
     *
     * MERGE MODEL: frontends may send only their new tasks (e.g. Lainnya sends ['tilawah'])
     * or a cumulative list (e.g. Sholat sends ['subuh', 'dzuhur']).
     * The backend always merges with previously logged tasks, so we only need to validate
     * that at least ONE task in the submission is genuinely new.
     */
    protected function validateBeribadahData(array $data, ?HabitLog $existing): void
    {
        $religion = strtolower($data['religion'] ?? '');
        $tasks    = array_values(array_unique($data['tasks'] ?? []));

        // 1. Validate religion
        if (!in_array($religion, $this->validReligions)) {
            throw new \Exception("Agama tidak valid.");
        }

        // 2. Tasks must be a non-empty array
        if (!is_array($tasks) || empty($tasks)) {
            throw new \Exception("Pilih minimal satu ibadah untuk dicatat.");
        }

        // 3. Each task must be in the whitelist for this religion
        $allowed = $this->validTasks[$religion] ?? [];
        foreach ($tasks as $task) {
            if (!in_array($task, $allowed)) {
                throw new \Exception("Ibadah '{$task}' tidak dikenal untuk agama {$religion}.");
            }
        }

        // 4. Cap: cannot exceed total available tasks for the religion
        $maxTasks = count($allowed);
        if (count($tasks) > $maxTasks) {
            throw new \Exception("Jumlah ibadah melebihi batas maksimum ({$maxTasks}).");
        }

        // 5. Islam: validate that newly submitted prayers are within their time window
        if ($religion === 'islam') {
            $this->validateIslamPrayerTimes($tasks, $existing);
        }

        // 6. If updating, ensure at least one NEW task is being added.
        //    (Frontend may send only new tasks OR a cumulative list — both are handled via merge.)
        if ($existing) {
            $prevDetail = HabitLogDetail::where('habit_log_id', $existing->id)
                ->where('key', 'tasks')
                ->first();
            if ($prevDetail) {
                $prevTasks = json_decode($prevDetail->value, true) ?? [];
                $newTasks  = array_diff($tasks, $prevTasks);   // tasks not yet in the log
                if (empty($newTasks)) {
                    throw new \Exception("Semua ibadah ini sudah pernah kamu catat hari ini.");
                }
            }
        }
    }

    /**
     * Validate that Islam prayers are submitted within their allowed time window.
     * Grace period: 30 minutes BEFORE the window starts (e.g., prepare for Subuh early).
     * Cannot mark a prayer AFTER its window has ended.
     */
    protected function validateIslamPrayerTimes(array $tasks, ?HabitLog $existing): void
    {
        $now         = Carbon::now();
        $nowMins     = $now->hour * 60 + $now->minute;
        $graceMins   = 30; // allow marking up to 30 min before window starts
        $prayerNames = array_keys($this->prayerWindows);

        // Determine which prayers are newly submitted (not in existing log)
        $alreadyDone = [];
        if ($existing) {
            $prevDetail = HabitLogDetail::where('habit_log_id', $existing->id)
                ->where('key', 'tasks')
                ->first();
            if ($prevDetail) {
                $alreadyDone = json_decode($prevDetail->value, true) ?? [];
            }
        }

        foreach ($tasks as $task) {
            // Only validate the 5 prayers (not tilawah/puasa which are flexible)
            if (!isset($this->prayerWindows[$task])) continue;
            // Skip prayers that were already recorded (we only validate newly added ones)
            if (in_array($task, $alreadyDone)) continue;

            $window     = $this->prayerWindows[$task];
            $startParts = explode(':', $window['start']);
            $endParts   = explode(':', $window['end']);
            $startMins  = (int)$startParts[0] * 60 + (int)$startParts[1];
            $endMins    = (int)$endParts[0] * 60 + (int)$endParts[1];

            // Allow with grace period before start
            $allowedFrom = $startMins - $graceMins;

            // Handle midnight crossing (e.g., Isya ends at 03:30)
            if ($endMins < $startMins) {
                // Window crosses midnight
                $inWindow = ($nowMins >= $allowedFrom || $nowMins < $endMins);
            } else {
                $inWindow = ($nowMins >= $allowedFrom && $nowMins < $endMins);
            }

            if (!$inWindow) {
                $prayerLabel = ucfirst($task);
                throw new \Exception("Waktu sholat {$prayerLabel} belum tiba atau sudah lewat. Silakan cek jadwal sholat hari ini.");
            }
        }
    }

    public function submitHabit(User $user, string $habitCode, array $data = [])
    {
        $habit = Habit::where('code', $habitCode)->firstOrFail();
        $now   = Carbon::now();
        $today = $now->toDateString();

        // 1. Check if already submitted today
        $existing = HabitLog::where('user_id', $user->id)
            ->where('habit_id', $habit->id)
            ->where('log_date', $today)
            ->first();

        // 1a. Anti-cheat validation for beribadah (runs before point calculation)
        if ($habitCode === 'beribadah') {
            $this->validateBeribadahData($data, $existing);
        }

        // 2. Calculate points
        $points = $this->calculatePoints($habitCode, $now, $data);

        return DB::transaction(function () use ($user, $habit, $today, $points, $data, $existing) {
            if ($existing) {
                // For 'beribadah', we allow updating because it can be done multiple times per day
                if ($habit->code === 'beribadah') {
                    $oldXp   = $existing->base_xp + $existing->bonus_xp;
                    $oldCoin = $existing->coin_earned;

                    // --- MERGE: load previously logged tasks and merge with newly submitted ---
                    $prevDetail = HabitLogDetail::where('habit_log_id', $existing->id)
                        ->where('key', 'tasks')
                        ->first();
                    $prevTasks = $prevDetail ? (json_decode($prevDetail->value, true) ?? []) : [];

                    // Merge: union of old and new (frontend may send only new or full list)
                    $mergedTasks         = array_values(array_unique(array_merge($prevTasks, $data['tasks'] ?? [])));
                    $mergedData          = $data;
                    $mergedData['tasks'] = $mergedTasks;

                    // Recalculate with the full merged task list
                    $mergedPoints = $this->calculatePoints($habit->code, Carbon::now(), $mergedData);

                    $existing->update([
                        'base_xp'     => $mergedPoints['xp'],
                        'bonus_xp'    => $mergedPoints['bonus_xp'] ?? 0,
                        'coin_earned' => $mergedPoints['coin'],
                        'star_earned' => $mergedPoints['star'] ?? 0,
                    ]);

                    // Replace details with merged data
                    HabitLogDetail::where('habit_log_id', $existing->id)->delete();
                    foreach ($mergedData as $key => $value) {
                        if (is_array($value)) $value = json_encode($value);
                        HabitLogDetail::create([
                            'habit_log_id' => $existing->id,
                            'key'          => $key,
                            'value'        => (string) $value,
                        ]);
                    }

                    // Credit only the incremental difference
                    $newTotalXp = ($mergedPoints['xp'] ?? 0) + ($mergedPoints['bonus_xp'] ?? 0);
                    $xpDiff     = max(0, $newTotalXp - $oldXp);
                    $coinDiff   = max(0, $mergedPoints['coin'] - $oldCoin);

                    if ($xpDiff > 0 || $coinDiff > 0) {
                        $diffLog              = clone $existing;
                        $diffLog->base_xp     = $xpDiff;
                        $diffLog->bonus_xp    = 0;
                        $diffLog->coin_earned = $coinDiff;
                        $this->creditPoints($user, $diffLog);
                    }

                    // Refresh so created_at and other DB-generated values are loaded
                    $existing->refresh();
                    return $existing;
                }

                throw new \Exception("Kamu sudah mengisi kebiasaan ini hari ini.");
            }

            // 3. Create Log
            $log = HabitLog::create([
                'user_id'     => $user->id,
                'habit_id'    => $habit->id,
                'log_date'    => $today,
                'base_xp'     => $points['xp'],
                'bonus_xp'    => $points['bonus_xp'] ?? 0,
                'coin_earned' => $points['coin'],
                'star_earned' => $points['star'] ?? 0,
                'status'      => ($points['needs_approval'] ?? false) ? 'pending' : 'approved',
            ]);

            // 4. Save Details
            foreach ($data as $key => $value) {
                if (is_array($value)) $value = json_encode($value);
                HabitLogDetail::create([
                    'habit_log_id' => $log->id,
                    'key'          => $key,
                    'value'        => (string) $value,
                ]);
            }

            // 5. Credit points if approved
            if ($log->status === 'approved') {
                $this->creditPoints($user, $log);
            }

            // Refresh to ensure created_at is populated from DB before returning
            $log->refresh();
            return $log;
        });
    }

    protected function calculatePoints(string $habitCode, Carbon $now, array $data): array
    {
        $habitRules = $this->rules['habits'][$habitCode] ?? null;
        if (!$habitRules) return ['xp' => 0, 'coin' => 0];

        $xp             = 0;
        $coin           = 0;
        $needs_approval = false;

        switch ($habitCode) {
            case 'bangun_pagi':
                $time       = $now->format('H:i');
                $isWeekend  = $now->isWeekend();
                $onTimeLimit = $isWeekend
                    ? $habitRules['time_windows']['on_time']['weekend']
                    : $habitRules['time_windows']['on_time']['weekday'];

                if ($time <= $onTimeLimit) {
                    $xp   = $habitRules['points']['on_time']['xp'];
                    $coin = $habitRules['points']['on_time']['coin'];
                } elseif ($time <= $habitRules['time_windows']['valid']['end']) {
                    $xp   = $habitRules['points']['late']['xp'];
                    $coin = $habitRules['points']['late']['coin'];
                }

                // Extra actions bonus
                $extraCount = !empty($data['extra_actions']) && is_array($data['extra_actions'])
                    ? count($data['extra_actions']) : 0;
                if (!empty($data['note'])) {
                    $extraCount++;
                }
                if ($extraCount > 0) {
                    $xp += $extraCount * ($habitRules['extras']['action_bonus'] ?? 10);
                }
                break;

            case 'olahraga':
                $xp       = $habitRules['points']['check_in'];
                $duration = min($data['duration'] ?? 0, $habitRules['limits']['max_minutes']);
                $xp      += floor($duration / 5) * $habitRules['points']['per_5_minutes'];
                if (!empty($data['photo'])) $needs_approval = true;
                break;

            case 'makan_sehat':
                if (($data['checklist_count'] ?? 0) >= 4) {
                    $xp = $habitRules['points']['complete'];
                }
                $water  = min($data['water_glasses'] ?? 0, $habitRules['limits']['max_water_glasses']);
                $xp    += $water * $habitRules['points']['per_water_glass'];
                break;

            case 'tidur':
                $time      = $now->format('H:i');
                $targetEnd = $habitRules['time_windows']['target']['end'];
                if ($time <= $targetEnd) {
                    $xp = $habitRules['points']['on_time'];
                } else {
                    $diffMinutes = Carbon::createFromFormat('H:i', $time)
                        ->diffInMinutes(Carbon::createFromFormat('H:i', $targetEnd));
                    $penalty = floor($diffMinutes / 6) * abs($habitRules['points']['late_penalty']);
                    $xp      = max(0, $habitRules['points']['on_time'] - $penalty);
                }
                break;

            case 'beribadah':
                $religion = strtolower($data['religion'] ?? 'others');
                $tasks    = $data['tasks'] ?? [];
                $isIslam  = ($religion === 'islam');

                $ruleSet = $isIslam 
                    ? ($habitRules['islam'] ?? null) 
                    : ($habitRules['others'] ?? ($habitRules['islam'] ?? null));

                if (!$ruleSet) {
                    $xp   = 0;
                    $coin = 0;
                } elseif ($isIslam) {
                    // Islam: count the 5 fardhu prayers
                    $prayerNames  = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'];
                    $prayerCount  = count(array_filter($tasks, fn($t) => in_array($t, $prayerNames)));
                    $pointsPer    = $ruleSet['points_per_prayer'] ?? 10;
                    $xp           = $prayerCount * $pointsPer;
                    $coin         = $prayerCount * $pointsPer;

                    // Bonus for sunnah prayers
                    if (!empty($data['sunnah']) && is_array($data['sunnah'])) {
                        $xp += count($data['sunnah']) * ($ruleSet['bonus_sunnah'] ?? 5);
                    }

                    // Bonus for Tilawah
                    if (in_array('tilawah', $tasks)) {
                        $xp += $ruleSet['bonus_sunnah'] ?? 25;
                    }

                    // Bonus for Puasa
                    if (in_array('puasa', $tasks)) {
                        $xp += $ruleSet['bonus_fasting'] ?? 100;
                    }
                } else {
                    // Other religions: XP per completed task
                    $taskCount = count($tasks);
                    $pointsPer = $ruleSet['points_per_prayer'] ?? 25;
                    $xp        = $taskCount * $pointsPer;
                    $coin      = $taskCount * $pointsPer;
                }

                if (!empty($data['photo'])) $needs_approval = true;
                break;

            default:
                $xp   = $habitRules['points']['check_in'] ?? 0;
                $coin = $habitRules['points']['coin'] ?? 0;
                break;
        }

        return [
            'xp'             => $xp,
            'coin'           => $coin,
            'needs_approval' => $needs_approval,
            'star'           => 1, // Default 1 star per habit
        ];
    }

    public function creditPoints(User $user, HabitLog $log)
    {
        if ($log->base_xp > 0) {
            XpLedger::create([
                'user_id'     => $user->id,
                'source_type' => 'habit_log',
                'source_id'   => $log->id,
                'amount'      => $log->base_xp,
            ]);
        }

        if ($log->coin_earned > 0) {
            CoinLedger::create([
                'user_id'     => $user->id,
                'source_type' => 'habit_log',
                'source_id'   => $log->id,
                'amount'      => $log->coin_earned,
            ]);
        }

        // Trigger stat update
        app(GamificationService::class)->updateUserStats($user);
    }
}
