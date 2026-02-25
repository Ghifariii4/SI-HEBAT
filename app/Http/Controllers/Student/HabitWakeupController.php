<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\HabitLogDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class HabitWakeupController extends Controller
{
    public function index()
    {
        return Inertia::render('Student/Habit/Bangun', [
            'serverTime' => Carbon::now()->toIso8601String(), 
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'activities' => 'array',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();
        
        // ANTI-CHEAT: Use server time, not client time
        $now = Carbon::now();
        $hour = $now->hour;
        $minute = $now->minute;
        $timeValue = $hour + ($minute / 60);
        
        // Calculate points based on server time (per documentation)
        $xpEarned = 0;
        $koinEarned = 0;
        
        if ($timeValue >= 3 && $timeValue < 5) {
            // 03:00 - 05:00
            $xpEarned = 50;
            $koinEarned = 50;
        } elseif ($timeValue >= 5 && $timeValue < 5.5) {
            // 05:00 - 05:30
            $xpEarned = 40;
            $koinEarned = 40;
        } elseif ($timeValue >= 5.5 && $timeValue < 6) {
            // 05:30 - 06:00
            $xpEarned = 30;
            $koinEarned = 30;
        } elseif ($timeValue >= 6 && $timeValue < 7) {
            // 06:00 - 07:00
            $xpEarned = 20;
            $koinEarned = 20;
        } elseif ($timeValue >= 7 && $timeValue < 8) {
            // 07:00 - 08:00 (Late)
            $xpEarned = 10;
            $koinEarned = 10;
        } elseif ($timeValue >= 8 && $timeValue < 9) {
            // 08:00 - 09:00 (Very Late)
            $xpEarned = 5;
            $koinEarned = 5;
        }
        
        if ($timeValue < 3 || $timeValue >= 9) {
            return back()->withErrors(['activities' => 'Sesi absen belum dibuka atau sudah ditutup, Dibuka Pukul 03:00 - 09:00.']);
        }

        $habit = Habit::where('code', 'bangun_pagi')->first();
        $habitId = $habit ? $habit->id : 1;

        return \Illuminate\Support\Facades\DB::transaction(function () use ($user, $request, $xpEarned, $koinEarned, $habitId, $now) {
            // ANTI-CHEAT & REPETITION CHECK (inside transaction for lock)
            $existingLog = HabitLog::where('user_id', $user->id)
                ->where('habit_id', $habitId)
                ->where('log_date', Carbon::today())
                ->lockForUpdate()
                ->exists();

            if ($existingLog) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'activities' => 'Kamu sudah mencatat habit ini hari ini!'
                ]);
            }

            // Handle Image Upload
            $imagePath = null;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $imagePath = $file->storeAs('habits/wakeup', $filename, 'public');
            }

            // Create habit log
            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habitId,
                'status' => 'pending', 
                'base_xp' => $xpEarned,
                'coin_earned' => $koinEarned,
                'log_date' => Carbon::today(),
                'image_path' => $imagePath,
            ]);

            // Save activities as habit details (MAX 3)
            $bonusXp = 0;
            $activities = array_slice($request->activities ?? [], 0, 3);
            
            foreach ($activities as $activityName) {
                if (!empty(trim($activityName)) && is_string($activityName)) {
                    HabitLogDetail::create([
                        'habit_log_id' => $log->id,
                        'key' => 'morning_activity',
                        'value' => mb_strimwidth(trim($activityName), 0, 100, "..."),
                    ]);
                    
                    $bonusXp += 10;
                }
            }

            if ($bonusXp > 0) {
                $log->update([
                    'bonus_xp' => $bonusXp,
                    'coin_earned' => $xpEarned + $bonusXp
                ]);
                $xpEarned += $bonusXp;
                $koinEarned = $xpEarned;
            }

            // XP and Coins are NOT added yet as the status is 'pending'.
            // They will be credited once a teacher/admin approves this log.

            return back()->with([
                'message' => 'Waktu bangun berhasil dicatat!',
                'xp_earned' => $xpEarned,
                'koin_earned' => $koinEarned,
                'check_in_time' => $now->format('H:i'),
            ]);
        });
    }
}
