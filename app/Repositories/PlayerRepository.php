<?php

namespace App\Repositories;

use App\Models\Player;

class PlayerRepository extends BaseRepository implements PlayerRepositoryInterface
{
    public function __construct(Player $model)
    {
        parent::__construct($model);
    }
}
