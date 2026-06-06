<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSetting extends Model
{
    protected $fillable = [
        'badge_text',
        'title_white',
        'title_red',
        'description',
        'background_image',
        'character_image',
        'service_cards',
        'is_active',
    ];

    protected $casts = [
        'service_cards' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'background_image_url',
        'character_image_url',
    ];

    public function getBackgroundImageUrlAttribute(): ?string
    {
        if (!$this->background_image) {
            return null;
        }

        return asset('storage/' . ltrim($this->background_image, '/'));
    }

    public function getCharacterImageUrlAttribute(): ?string
    {
        if (!$this->character_image) {
            return null;
        }

        return asset('storage/' . ltrim($this->character_image, '/'));
    }
}