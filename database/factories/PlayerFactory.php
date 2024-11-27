<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\PlayerClass;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Player>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'class' => $this->faker->randomElement(array_column(PlayerClass::cases(), 'value')),
            'xp' => $this->faker->numberBetween(1, 100),
            'confirmed' => $this->faker->boolean(),
        ];
    }
}
