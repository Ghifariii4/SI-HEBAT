<?php

namespace App\Http\Controllers;

use App\Services\HabitService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HabitController extends Controller
{
    protected HabitService $habitService;

    public function __construct(HabitService $habitService)
    {
        $this->habitService = $habitService;
    }

    public function store(Request $request, string $habitCode)
    {
        /**
         * Support two payload shapes from the frontend:
         *
         * Shape A (wrapped): { data: { religion: '...', tasks: [...] } }
         * Shape B (flat):    { religion: '...', tasks: [...], sunnah: [...], ... }
         *
         * All current components use Shape B (Inertia router.post with flat fields).
         * We detect which shape is being used and normalise to a plain array.
         */
        if ($request->has('data') && is_array($request->input('data'))) {
            // Shape A: data is explicitly nested under 'data' key
            $habitData = $request->input('data');
        } else {
            // Shape B: data is at the root level of the request
            // Pull only the keys relevant to habit logging (safe subset)
            $habitData = $request->only([
                'religion', 'tasks', 'sunnah', 'duration', 'photo',
                'note', 'extra_actions', 'checklist_count', 'water_glasses',
                'fasting_type', 'description', 'quran',
            ]);
            // Filter out null values so defaults in the service work correctly
            $habitData = array_filter($habitData, fn($v) => !is_null($v));
        }

        try {
            $log = $this->habitService->submitHabit(
                $request->user(),
                $habitCode,
                $habitData
            );

            return back()->with('success', 'Kebiasaan berhasil dicatat!')
                         ->with('xp_earned', (int)(($log->base_xp ?? 0) + ($log->bonus_xp ?? 0)))
                         ->with('koin_earned', (int)($log->coin_earned ?? 0))
                         ->with('check_in_time', $log->created_at ? $log->created_at->format('H:i') : now()->format('H:i'));
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
