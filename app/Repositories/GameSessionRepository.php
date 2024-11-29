<?php

namespace App\Repositories;

use App\Models\Player;
use App\Models\Guild;
use App\Enums\PlayerClass;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class GameSessionRepository implements GameSessionRepositoryInterface
{
    public function getPlayersToAddToSession(): object
    {
        $confirmedIds = Player::where('confirmed', true)->pluck('id');
        $playersWithStats = Player::paginate(10);

        return (object)[
            'players' => $playersWithStats,
            'confirmedIds' => $confirmedIds,
        ];
    }

    public function setAllPlayersAsUnconfirmed(): bool
    {
        return Player::query()->update(['confirmed' => false]);
    }

    public function setPlayersAsConfirmed(array $ids): bool
    {
        $this->setAllPlayersAsUnconfirmed();
        return Player::whereIn('id', $ids)->update(['confirmed' => true]);
    }

    public function formGuild(): object
    {
        $players = Player::where('confirmed', true)->get();
        $form = $this->gheckIdealForm($players);

        $clerics = $form->classes['clerics']->sortByDesc('xp');
        $warriors = $form->classes['warriors']->sortByDesc('xp');
        $ranged = $form->classes['ranged']->sortByDesc('xp');

        $guilds = Guild::all();
        $formGuilds = $guilds->map(function ($guild) {
            return [
                'guild' => $guild,
                'players' => collect(),
                'total_xp' => 0,
            ];
        });

        $this->distributeByClass($formGuilds, $clerics);
        $this->distributeByClass($formGuilds, $warriors);
        $this->distributeByClass($formGuilds, $ranged);

        return $formGuilds;
    }

    private function gheckIdealForm(Collection $players): object
    {
        $clerics = $players->filter(fn($player) => $player->class->value === PlayerClass::CLERIC->value);
        $warriors = $players->filter(fn($player) => $player->class->value === PlayerClass::WARRIOR->value);
        $ranged = $players->filter(fn($player) => $player->class->value === PlayerClass::MAGE->value || $player->class->value === PlayerClass::ARCHER->value);

        // Checking if we have the ideal formation (at least two of each class)
        if ($clerics->count() >= 2 && $warriors->count() >= 2 && $ranged->count() >= 2) {
            return (object)[
                'ideal' => true,
                'classes' => [
                    'clerics' => $clerics,
                    'warriors' => $warriors,
                    'ranged' => $ranged,
                ]
            ];
        }

        return (object)[
            'ideal' => false,
            'classes' => [
                'clerics' => $clerics,
                'warriors' => $warriors,
                'ranged' => $ranged,
            ]
        ];
    }

    private function distributeByClass(Collection &$guilds, Collection $players)
    {
        $guildsArray = $guilds->toArray();
        foreach ($players as $player) {
            $guildIndex = collect($guildsArray)->sortBy('total_xp')->keys()->first();

            $guildsArray[$guildIndex]['players'][] = $player;
            $guildsArray[$guildIndex]['total_xp'] += $player->xp;
        }
        $guilds = collect($guildsArray);
    }
}
