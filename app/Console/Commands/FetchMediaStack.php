<?php

namespace App\Console\Commands;

use App\Models\Language;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use App\Services\PostService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class FetchMediaStack extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:mediastack';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->fetch();
        return Command::SUCCESS;
    }

    public function fetch()
    {

        $categories = PostCategory::select("id", "title")->get();

        foreach ($categories as $category) {
            //   try {
            // $response  = Cache::remember("test", 1, function () use ($category) {
            $response =  Http::get('http://api.mediastack.com/v1/news', [
                'access_key' => config('constants.mediastack_key'),
                'categories' => $category->slug,
                'date' => Carbon::now()->format('Y-m-d') . ',' . Carbon::now()->subDays(3)->format('Y-m-d'),
                'limit' => 99,
                'sort' => 'popularity',
                'sources' => 'en'
            ]);
            // });
            // dd($response);
            $newses = $response->json();

            $this->createNews($newses['data'], $category->id);
            //   } catch (\Throwable $th) {
            //     dd($category, $th->getMessage());
            //   }
        }
    }

    private function createNews($data, $categoryId)
    {
        $language = Language::whereShortCode("en")->first();
        $author = User::whereEmail("subashrijal5@gmail.com")->first();
        foreach ($data as $single) {
            Log::info("sdfg", $single);
            $post =  Post::updateOrCreate(
                ['title' => $single['title']],
                [

                    'description' => $single['description'],
                    "source" => "Media Stack",
                    "language" => $language->id,
                    "source_url" => $single['url'],
                    "published_at" => Carbon::parse($single['published_at']),
                    "meta_title" => Str::limit($single['title'], 70),
                    "meta_description" => $single['description'],
                    "author_id" => $author->id,
                ]
            );

            $post->categories()->attach($categoryId);
        }
    }
}
