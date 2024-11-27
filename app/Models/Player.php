<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\PlayerClass;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = [
        'name', 
        'class', 
        'xp', 
        'confirmed'
    ];

    protected $casts = [
        'class' => PlayerClass::class,
    ];
}
