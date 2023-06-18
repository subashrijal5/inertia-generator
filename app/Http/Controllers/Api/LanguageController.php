<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiBaseController;
use App\Http\Controllers\Controller;
use App\Services\LanguageService;
use Illuminate\Http\Request;

class LanguageController extends ApiBaseController
{
    public function __construct(private LanguageService $service)
    {
    }
    public function index()
    {
        try {
            $languages = $this->service->get(['id as value', 'name as label']);
            return $this->dataResponse($languages);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getCode());
        }
    }
}
