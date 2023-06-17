<?php

namespace App\Services;
use App\Models\PostCategory;

class PostCategoryService extends BaseService
{
     public function __construct(PostCategory $service)
     {
        $this->model = $service;
     }
}
