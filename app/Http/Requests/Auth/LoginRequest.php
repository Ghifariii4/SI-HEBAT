<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role' => ['required', 'string', 'in:siswa,guru,orang_tua'],
            'nis' => ['required_if:role,siswa', 'nullable', 'string'],
            'nip' => ['required_if:guru_type,pns', 'nullable', 'string'],
            'full_name' => ['required_if:guru_type,honorer', 'nullable', 'string'],
            'email' => ['required_if:role,orang_tua', 'nullable', 'string', 'email'],
            'password' => ['required', 'string'],
            'guru_type' => ['required_if:role,guru', 'nullable', 'string', 'in:pns,honorer'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $role = $this->role;
        $credentials = ['password' => $this->password];
        $errorField = '';
        $query = \App\Models\User::query();

        if ($role === 'siswa') {
            $query->where('nis', $this->nis);
            $credentials['nis'] = $this->nis;
            $errorField = 'nis';
        } elseif ($role === 'guru') {
            if ($this->guru_type === 'pns') {
                $query->where('nip', $this->nip);
                $credentials['nip'] = $this->nip;
                $errorField = 'nip';
            } else {
                $query->where('full_name', $this->full_name);
                $credentials['full_name'] = $this->full_name;
                $errorField = 'full_name';
            }
        } elseif ($role === 'orang_tua') {
            $query->where('email', $this->email);
            $credentials['email'] = $this->email;
            $errorField = 'email';
        }

        // Cari user terlebih dahulu untuk cek apakah identitas ada
        $user = $query->first();

        if (!$user) {
            \Illuminate\Support\Facades\Log::warning("Login failed: Identity not found for role $role", ['identifier' => $credentials]);
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                $errorField => 'Identitas tidak ditemukan dalam sistem kami.',
            ]);
        }

        // Jika identitas ada, baru cek password via Auth::attempt
        // Laravel's attempt will naturally use the getAuthPassword() method from the User model
        if (! Auth::attempt($credentials, $this->boolean('remember'))) {
            \Illuminate\Support\Facades\Log::warning("Login failed: Wrong password for user", ['email' => $user->email, 'nis' => $user->nis]);
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'password' => 'Kata sandi yang Anda masukkan salah.',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        $identifier = $this->nis ?? $this->nip ?? $this->full_name ?? $this->email;
        return Str::transliterate(Str::lower($identifier).'|'.$this->ip());
    }
}
