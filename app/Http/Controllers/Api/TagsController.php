<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiBaseController;
use App\Http\Controllers\Controller;
use App\Services\TagService;
use Illuminate\Http\Request;

class TagsController extends ApiBaseController
{
    public function __construct(private TagService $service)
    {
    }
    public function index()
    {
        try {
            $languages = $this->service->get(['id as value', 'title as label']);
            return $this->dataResponse($languages);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getCode() ?? 500);
        }
    }
}
