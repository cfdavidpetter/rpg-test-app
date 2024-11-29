<?php

namespace App\Repositories;

interface GameSessionRepositoryInterface
{
    public function getPlayersToAddToSession(): object;
    public function setAllPlayersAsUnconfirmed(): bool;
    public function setPlayersAsConfirmed(array $ids): bool;
    public function formGuild(): object;
}
