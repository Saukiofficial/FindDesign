<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSetting extends Model
{
    protected $fillable = [
        'badge_text',
        'title',

        'founder_image',
        'founder_name',
        'founder_position',

        'quote',
        'description_1',
        'description_2',

        'stats',
        'values',

        'is_active',
    ];

    protected $casts = [
        'stats' => 'array',
        'values' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'founder_image_url',
    ];

    public function getFounderImageUrlAttribute(): ?string
    {
        if (!$this->founder_image) {
            return null;
        }

        return asset('storage/' . ltrim($this->founder_image, '/'));
    }
}