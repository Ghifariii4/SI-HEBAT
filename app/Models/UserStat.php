<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserStat extends Model
{
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false; // Using custom updated_at column in migration

    protected $fillable = [
        'user_id',
        'total_xp',
        'total_coin',
        'current_level',
        'current_rank',
        'current_star',
        'current_streak',
        'longest_streak',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
