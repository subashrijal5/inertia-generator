<?php

namespace App\Models;

use App\Traits\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory, SearchableTrait;

    protected $fillable =  ["name","short_code"];

    public static $rules = ['name' => 'required' ,'short_code' => 'required'];

    protected $searchable = ["name"];
}
