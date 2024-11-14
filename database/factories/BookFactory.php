<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name,
            'year' => $this->faker->year,
            'language' => $this->faker->languageCode,
            'pages' => $this->faker->numberBetween(100, 500),
            'summary' => $this->faker->paragraph,
            'isbn' => $this->faker->isbn13,
            'cover' => 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
            'stock' => $this->faker->numberBetween(0, 100),
            'price' => $this->faker->numberBetween(10000, 100000),
            'category_id' => mt_rand(1, 10),
            'publisher_id' => mt_rand(1, 10),
        ];
    }
}
