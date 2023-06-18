<?php

use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Api\PostCategoryController;
use App\Http\Controllers\Api\TagsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return response()->json("Api is running");
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(LanguageController::class)->prefix('languages')->group(function () {
    Route::get('/', 'index');
});

Route::controller(TagsController::class)->prefix('tags')->group(function () {
    Route::get('/', 'index');
});


Route::controller(PostCategoryController::class)->prefix('categories')->group(function () {
    Route::get('/', 'index');
});
