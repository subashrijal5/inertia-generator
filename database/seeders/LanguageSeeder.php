<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = [
            ['name' => 'English', 'short_code' => 'en'],
            ['name' => 'Nepali', 'short_code' => 'ne'],
            ['name' => 'Japanese', 'short_code' => 'ja']
        ];
        foreach ($languages as $language) {
            Language::updateOrCreate(['short_code' => $language['short_code']], $language);
        }
    }
}
