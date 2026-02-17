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
        $request->validate([
            'data' => 'nullable|array',
        ]);

        try {
            $log = $this->habitService->submitHabit(
                $request->user(),
                $habitCode,
                $request->input('data', [])
            );

            return back()->with('success', 'Kebiasaan berhasil dicatat!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // Specialized methods for different habits if needed, 
    // but the generic store should work for most.
}
