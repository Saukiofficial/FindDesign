<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HeroSetting extends Model
{
    protected $fillable = [
        'logo_image',
        'brand_image',
        'hero_title_image',
        'hero_character_desktop',
        'hero_character_mobile',
        'hero_background_image',
        'signature_image',

        'welcome_text',
        'subtitle',
        'description',

        'primary_button_text',
        'primary_button_link',
        'secondary_button_text',
        'secondary_button_link',

        'stats',
        'service_cards',
        'social_links',

        'is_active',
    ];

    protected $casts = [
        'stats' => 'array',
        'service_cards' => 'array',
        'social_links' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'logo_image_url',
        'brand_image_url',
        'hero_title_image_url',
        'hero_character_desktop_url',
        'hero_character_mobile_url',
        'hero_background_image_url',
        'signature_image_url',
    ];

    public function getLogoImageUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->logo_image);
    }

    public function getBrandImageUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->brand_image);
    }

    public function getHeroTitleImageUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->hero_title_image);
    }

    public function getHeroCharacterDesktopUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->hero_character_desktop);
    }

    public function getHeroCharacterMobileUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->hero_character_mobile);
    }

    public function getHeroBackgroundImageUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->hero_background_image);
    }

    public function getSignatureImageUrlAttribute(): ?string
    {
        return $this->getStorageUrl($this->signature_image);
    }

    private function getStorageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk('public')->url($path);
    }
}