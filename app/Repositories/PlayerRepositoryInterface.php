<?php

namespace App\Repositories;

use App\Models\Player;

interface PlayerRepositoryInterface
{
    public function getAllPlayers(): array;

    public function getPlayerById(int $id): ?Player;

    public function createPlayer(array $data): Player;

    public function updatePlayer(int $id, array $data): bool;

    public function deletePlayer(int $id): bool;
}
