<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            "General",
            "Technology",
            "Science",
            "Sports",
            "Health",
            "Entertainment",
            "Business"
        ];
        foreach ($categories as $category) {
            PostCategory::firstOrCreate(['title' => $category, "meta_title" => $category . " - Blog"]);
        }
    }
}
