<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Habit extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'code',
        'name',
        'max_star',
    ];

    public function logs(): HasMany
    {
        return $this->hasMany(HabitLog::class);
    }
}
