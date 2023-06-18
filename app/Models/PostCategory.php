<?php

namespace App\Models;

use App\Traits\SearchableTrait;
use App\Traits\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    protected $table = "post_categories";
    use HasFactory, SearchableTrait, Sluggable;
    protected function getSlugColumnName()
    {
        return 'title';
    }

    protected $fillable =  ["title", "slug","meta_title", "meta_description", "description"];
    public static $rules = ['title' => 'required', 'meta_title' => 'nullable', 'meta_description' => 'nullable', 'description' => 'required'];

    protected $searchable = ["title", "meta_title", "meta_description"];
}
