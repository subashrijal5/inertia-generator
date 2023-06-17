<?php

namespace App\Services;
use App\Models\Language;

class LanguageService extends BaseService
{
     public function __construct(Language $service)
     {
        $this->model = $service;
     }
}
