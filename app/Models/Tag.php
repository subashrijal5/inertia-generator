<?php

namespace App\Models;

use App\Traits\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory, SearchableTrait;

    protected $fillable =  ["title"];

    public static $rules = ['title' => 'required'];

    protected $searchable = ["title"];
}
