<?php

namespace App\Http\Controllers\Student\Habit\Ibadah;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\HabitLogDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class IslamController extends Controller
{
    /**
     * Store Sholat Wajib log
     */
    public function storeSholat(Request $request)
    {
        $request->validate([
            'prayer' => 'required|string|in:subuh,dzuhur,ashar,maghrib,isya',
            'is_qobliyah' => 'boolean',
            'is_ba_diyah' => 'boolean',
            'is_jamaah' => 'boolean',
            'is_tepat_waktu' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        $user = Auth::user();
        $now = Carbon::now();
        $prayer = $request->prayer;
        $time = $now->format('H:i');

        // 1. Validasi Waktu (Sesuai SISTEM_AGAMA.md)
        $ranges = [
            'subuh'   => ['05:00', '06:00'],
            'dzuhur'  => ['12:00', '15:00'],
            'ashar'   => ['15:10', '16:30'],
            'maghrib' => ['18:00', '19:00'],
            'isya'    => ['19:00', '21:30'],
        ];

        // Custom validation for prayer times
        $start = $ranges[$prayer][0];
        $end = $ranges[$prayer][1];

        if ($time < $start || $time > $end) {
            return back()->withErrors(['prayer' => "Bukan waktu sholat $prayer atau waktu sudah lewat ($time)."]);
        }

        // Additional Rule: Dzuhur locks when Ashar starts (15:10)
        if ($prayer === 'dzuhur' && $time >= '15:10') {
            return back()->withErrors(['prayer' => 'Waktu Dzuhur sudah terkunci karena sudah masuk waktu Ashar.']);
        }

        // Additional Rule: Maghrib locks when Isya begins (19:00)
        if ($prayer === 'maghrib' && $time >= '19:00') {
            return back()->withErrors(['prayer' => 'Waktu Maghrib sudah terkunci karena sudah masuk waktu Isya.']);
        }

        $habit = Habit::where('code', 'ibadah')->first();
        if (!$habit) $habit = Habit::create(['code' => 'ibadah', 'name' => 'Beribadah']);

        return DB::transaction(function () use ($user, $request, $prayer, $habit, $now) {
            // Anti-cheat: 1 log per prayer per day
            $logKey = "sholat_" . $prayer;
            $existing = HabitLog::where('user_id', $user->id)
                ->where('habit_id', $habit->id)
                ->where('log_date', Carbon::today())
                ->whereHas('details', function ($q) use ($logKey) {
                    $q->where('key', 'prayer_type')->where('value', $logKey);
                })
                ->exists();

            if ($existing) {
                return back()->withErrors(['prayer' => "Kamu sudah mencatat sholat $prayer hari ini!"]);
            }

            // Points Calculation (POIN_AGAMA.md)
            $xp = 20; // Base
            $koin = 20;

            if ($request->is_qobliyah) $xp += 8;
            if ($request->is_ba_diyah) $xp += 8;
            if ($request->is_jamaah) $xp += 10;
            if ($request->is_tepat_waktu) $xp += 5;

            // Photo processing (Mocking for now, context depends on filesystem)
            $hasPhoto = $request->hasFile('photo');
            if ($hasPhoto && $request->is_jamaah) {
                // +10 XP if with photo & jamaah (ACC Guru required)
                // We add it to points but it's pending anyway
                $xp += 10;
            }

            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'log_date' => Carbon::today(),
                'base_xp' => $xp,
                'coin_earned' => $koin,
                'status' => 'pending',
            ]);

            HabitLogDetail::create([
                'habit_log_id' => $log->id,
                'key' => 'prayer_type',
                'value' => $logKey,
            ]);

            if ($request->is_jamaah) HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'is_jamaah', 'value' => 'true']);
            if ($request->is_qobliyah) HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'is_qobliyah', 'value' => 'true']);
            if ($request->is_ba_diyah) HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'is_ba_diyah', 'value' => 'true']);

            return back()->with([
                'success' => true,
                'xp_earned' => $xp,
                'koin_earned' => $koin,
                'message' => "Sholat $prayer berhasil dicatat!",
            ]);
        });
    }

    /**
     * Store Sunnah Sholat
     */
    public function storeSunnah(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:dhuha,tahajud,witir',
        ]);

        $user = Auth::user();
        $now = Carbon::now();
        $type = $request->input('type');
        $time = $now->format('H:i');

        // Validasi Waktu
        $isValid = false;
        if ($type === 'dhuha' && ($time >= '06:15' && $time <= '10:00')) $isValid = true;
        if ($type === 'tahajud' && ($time >= '03:00' && $time <= '04:45')) $isValid = true;
        if ($type === 'witir' && ($time >= '19:30' || $time <= '03:00')) $isValid = true;

        if (!$isValid) {
            return back()->withErrors(['type' => "Bukan waktu sholat $type ($time)."]);
        }

        $habit = Habit::where('code', 'ibadah')->first();
        
        return DB::transaction(function () use ($user, $type, $habit) {
            $logKey = "sunnah_" . $type;
            $existing = HabitLog::where('user_id', $user->id)
                ->where('habit_id', $habit->id)
                ->where('log_date', Carbon::today())
                ->whereHas('details', function ($q) use ($logKey) {
                    $q->where('key', 'prayer_type')->where('value', $logKey);
                })
                ->exists();

            if ($existing) return back()->withErrors(['type' => "Sudah mencatat $type hari ini."]);

            // Witir check: Must have performed Isya
            if ($type === 'witir') {
                $isyaExists = HabitLog::where('user_id', $user->id)
                    ->where('habit_id', $habit->id)
                    ->where('log_date', Carbon::today())
                    ->whereHas('details', function ($q) {
                        $q->where('key', 'prayer_type')->where('value', 'sholat_isya');
                    })
                    ->exists();
                if (!$isyaExists) return back()->withErrors(['type' => 'Witir hanya bisa dicatat jika sudah Sholat Isya.']);
            }

            $xp = 20;
            if ($type === 'tahajud') $xp = 30;
            if ($type === 'witir') $xp = 15;

            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'log_date' => Carbon::today(),
                'base_xp' => $xp,
                'coin_earned' => $xp, // Poin agama koin = XP biasanya
                'status' => 'pending',
            ]);

            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'prayer_type', 'value' => $logKey]);

            return back()->with(['success' => true, 'xp_earned' => $xp, 'message' => "Sholat $type berhasil dicatat!"]);
        });
    }

    /**
     * Store Quran
     */
    public function storeQuran(Request $request)
    {
        $request->validate([
            'surah_start' => 'required|string',
            'surah_end' => 'required|string',
            'ayat_start' => 'required|numeric',
            'ayat_end' => 'required|numeric',
        ]);

        $user = Auth::user();
        $habit = Habit::where('code', 'ibadah')->first();

        return DB::transaction(function () use ($user, $request, $habit) {
            $existing = HabitLog::where('user_id', $user->id)
                ->where('habit_id', $habit->id)
                ->where('log_date', Carbon::today())
                ->whereHas('details', function ($q) {
                    $q->where('key', 'activity_type')->where('value', 'baca_quran');
                })
                ->exists();

            if ($existing) return back()->withErrors(['quran' => 'Sudah mencatat baca Quran hari ini.']);

            $xp = 20;
            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'log_date' => Carbon::today(),
                'base_xp' => $xp,
                'coin_earned' => $xp,
                'status' => 'pending',
            ]);

            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'activity_type', 'value' => 'baca_quran']);
            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'progress', 'value' => $request->surah_start . " " . $request->ayat_start . " - " . $request->surah_end . " " . $request->ayat_end]);

            return back()->with(['success' => true, 'xp_earned' => $xp, 'message' => 'Baca Quran berhasil dicatat!']);
        });
    }

    /**
     * Store Puasa
     */
    public function storePuasa(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:senin-kamis,daud',
        ]);

        $user = Auth::user();
        $type = $request->type;
        $day = Carbon::now()->englishDayOfWeek; // Monday, Thursday etc

        // Validasi Hari (Senin-Kamis)
        if ($type === 'senin-kamis') {
            if (!in_array($day, ['Monday', 'Thursday'])) {
                return back()->withErrors(['type' => 'Puasa Senin-Kamis hanya bisa dilakukan di hari Senin atau Kamis.']);
            }
        }

        $habit = Habit::where('code', 'ibadah')->first();

        return DB::transaction(function () use ($user, $type, $habit) {
            // Anti-cheat: Max 1 puasa per day
            $existing = HabitLog::where('user_id', $user->id)
                ->where('habit_id', $habit->id)
                ->where('log_date', Carbon::today())
                ->whereHas('details', function ($q) {
                    $q->where('key', 'activity_type')->where('value', 'puasa');
                })
                ->exists();

            if ($existing) return back()->withErrors(['type' => 'Sudah mencatat puasa hari ini.']);

            // Daud logic: alternate days
            if ($type === 'daud') {
                $lastPuasa = HabitLog::where('user_id', $user->id)
                    ->where('habit_id', $habit->id)
                    ->where('log_date', Carbon::yesterday())
                    ->whereHas('details', function ($q) {
                        $q->where('key', 'puasa_type')->where('value', 'daud');
                    })
                    ->exists();

                if ($lastPuasa) {
                    return back()->withErrors(['type' => 'Puasa Daud dilakukan selang-seling, kemarin kamu sudah puasa Daud.']);
                }
            }

            $xp = 100;
            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'log_date' => Carbon::today(),
                'base_xp' => $xp,
                'coin_earned' => $xp,
                'status' => 'pending',
            ]);

            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'activity_type', 'value' => 'puasa']);
            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'puasa_type', 'value' => $type]);

            return back()->with(['success' => true, 'xp_earned' => $xp, 'message' => "Puasa $type berhasil dicatat!"]);
        });
    }

    /**
     * Store Alternative for Haid
     */
    public function storeAlternative(Request $request)
    {
        $request->validate([
            'activity' => 'required|string|in:dzikir,doa,kajian,sedekah',
            'photo' => 'required|image|max:2048',
        ]);

        $user = Auth::user();
        $habit = Habit::where('code', 'ibadah')->first();

        $points = [
            'dzikir' => 15,
            'doa' => 20,
            'kajian' => 20,
            'sedekah' => 25,
        ];

        $xp = $points[$request->activity];

        return DB::transaction(function () use ($user, $request, $habit, $xp) {
            $log = HabitLog::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'log_date' => Carbon::today(),
                'base_xp' => $xp,
                'coin_earned' => $xp,
                'status' => 'pending',
            ]);

            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'activity_type', 'value' => 'alternative_haid']);
            HabitLogDetail::create(['habit_log_id' => $log->id, 'key' => 'haid_activity', 'value' => $request->activity]);

            return back()->with(['success' => true, 'xp_earned' => $xp, 'message' => 'Ibadah pengganti haid berhasil dicatat!']);
        });
    }
}
