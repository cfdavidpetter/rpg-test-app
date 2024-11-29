<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\GuildController;
use App\Http\Controllers\GameSessionController;

$except = ['create', 'edit'];

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('/players', PlayerController::class)->except($except);
Route::resource('/guilds', GuildController::class)->except($except);

Route::get('/session/players', [GameSessionController::class, 'getPlayersToAddToSession']);
Route::post('/session/players/clear', [GameSessionController::class, 'setAllPlayersAsUnconfirmed']);
Route::post('/session/players/add', [GameSessionController::class, 'setPlayersAsConfirmed']);
Route::get('/session/guilds', [GameSessionController::class, 'getGuilds']);
