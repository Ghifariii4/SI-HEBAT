<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HabitLogDetail extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'habit_log_id',
        'key',
        'value',
    ];

    public function log(): BelongsTo
    {
        return $this->belongsTo(HabitLog::class, 'habit_log_id');
    }
}
