<?php

namespace App\Services;
use App\Models\Tag;

class TagService extends BaseService
{
     public function __construct(Tag $service)
     {
        $this->model = $service;
     }
}
