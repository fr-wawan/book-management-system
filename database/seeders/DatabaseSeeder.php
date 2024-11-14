<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\PenaltySetting;
use App\Models\Publisher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::create([
        //     'name' => 'Admin',
        //     'username' => 'admin',
        //     'email' => 'admin@gmail.com',
        //     'password' => 'qweasdzxc'
        // ]);
        // Category::factory(10)->create();
        // Publisher::factory(10)->create();
        // Book::factory(20)->create();

        $conditions = ['late', 'lost', 'damage'];
        foreach ($conditions as $condition) {
            PenaltySetting::create([
                'condition' => $condition,
                'amount' => 0
            ]);
        }
    }
}
