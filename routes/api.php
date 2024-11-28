<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\GuildController;

$except = ['create', 'edit'];

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('/players', PlayerController::class)->except($except);
Route::resource('/guilds', GuildController::class)->except($except);
