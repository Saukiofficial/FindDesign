<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedWork extends Model
{
    use HasFactory;

 
    protected $fillable = [
        'title',
        'description',
        'image',
    ];
}
