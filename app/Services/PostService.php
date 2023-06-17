<?php

namespace App\Services;
use App\Models\Post;

class PostService extends BaseService
{
     public function __construct(Post $service)
     {
        $this->model = $service;
     }
}
