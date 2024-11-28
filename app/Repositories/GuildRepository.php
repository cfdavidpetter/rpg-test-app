<?php

namespace App\Repositories;

use App\Models\Guild;

class GuildRepository extends BaseRepository implements GuildRepositoryInterface
{
    public function __construct(Guild $model)
    {
        parent::__construct($model);
    }
}
