<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

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

    public function fetch() {
        $response  = Http::get('http://api.mediastack.com/v1/news?access_key='. config('constants.mediastack_key'));
        dd($response->json());
    }
}
