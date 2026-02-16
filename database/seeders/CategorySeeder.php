<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Watches',
                'slug' => 'watches',
                'description' => 'Premium timepieces and luxury watches',
            ],
            [
                'name' => 'Jewelries',
                'slug' => 'jewelries',
                'description' => 'Exquisite jewelry pieces and accessories',
            ],
            [
                'name' => 'Bags',
                'slug' => 'bags',
                'description' => 'Designer handbags and luxury bags',
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Premium accessories and fashion items',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
