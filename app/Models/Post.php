<?php

namespace App\Models;

use App\Traits\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, SearchableTrait;

    protected $fillable =  ["title","author_id","summery","source","description","published_at"];

    public static $rules = ['title' => 'required' ,'author_id' => 'nullable' ,'summery' => 'nullable' ,'source' => 'nullable' ,'description' => 'required' ,'published_at' => 'required'];

    protected $searchable = ["title"];
}
