<?php

namespace App\Models;

use App\Traits\SearchableTrait;
use App\Traits\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, SearchableTrait, Sluggable;
    protected function getSlugColumnName()
    {
        return 'title';
    }


    protected $fillable =  ["title", "author_id", "summery", "source", "source_url", "description", "published_at", "meta_title", "meta_description"];

    public static $rules = ['title' => 'required', 'author_id' => 'nullable', 'summery' => 'nullable', 'source' => 'nullable', 'description' => 'required', 'published_at' => 'required'];

    protected $searchable = ["title"];

    public function categories()
    {
        return $this->belongsToMany(PostCategory::class, 'category_post', 'post_id', 'category_id');
    }

    public function language() {
        return $this->belongsTo(Language::class);
    }

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }
}
