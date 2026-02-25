<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            /*
             * Share Laravel flash data with every Inertia response.
             * We use a simpler direct access to ensure the data persists 
             * through the Inertia redirect.
             */
            'flash' => [
                'success'       => session('success'),
                'error'         => session('error'),
                'xp_earned'     => session('xp_earned'),
                'koin_earned'   => session('koin_earned'),
                'check_in_time' => session('check_in_time'),
            ],
            // Add app-wide constants/settings if needed
            'app_name' => config('app.name'),
        ];
    }
}
