<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Guild;

class GuildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Guild::factory()->create();
    }
}
