<?php

namespace App\Models;

use App\Traits\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    use HasFactory, SearchableTrait;

    protected $fillable =  ["title","meta_title","meta_description","description"];

    public static $rules = ['title' => 'required' ,'meta_title' => 'nullable' ,'meta_description' => 'nullable' ,'description' => 'required'];

    protected $searchable = ["title","meta_title","meta_description"];
}
