<?php

namespace App\Repositories;

use App\Models\Player;

class PlayerRepository implements PlayerRepositoryInterface
{
    public function getAllPlayers(): array
    {
        return Player::all()->toArray();
    }

    public function getPlayerById(int $id): ?Player
    {
        return Player::find($id);
    }

    public function createPlayer(array $data): Player
    {
        return Player::create($data);
    }

    public function updatePlayer(int $id, array $data): bool
    {
        $player = Player::find($id);

        if (!$player) {
            return false;
        }

        return $player->update($data);
    }

    public function deletePlayer(int $id): bool
    {
        $player = Player::find($id);

        if (!$player) {
            return false;
        }

        return $player->delete();
    }
}
