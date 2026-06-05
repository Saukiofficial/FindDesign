<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSettingController extends Controller
{
    public function edit()
    {
        $heroSetting = HeroSetting::firstOrCreate(
            ['id' => 1],
            [
                'welcome_text' => 'WELCOME TO',
                'subtitle' => 'CREATIVE STUDIO & DIGITAL ART AGENCY',
                'description' => 'We craft bold visuals, powerful brands, and immersive digital art that leave a lasting impact.',
                'primary_button_text' => 'Explore Portfolio',
                'primary_button_link' => '#portfolio',
                'secondary_button_text' => 'Start Project',
                'secondary_button_link' => '#contact',
                'stats' => [
                    [
                        'number' => '200+',
                        'label' => 'Projects Completed',
                        'icon' => 'diamond',
                    ],
                    [
                        'number' => '50+',
                        'label' => 'Happy Clients',
                        'icon' => 'star',
                    ],
                    [
                        'number' => '8+',
                        'label' => 'Years Experience',
                        'icon' => 'bolt',
                    ],
                ],
                'service_cards' => [
                    [
                        'title' => 'Illustration',
                        'subtitle' => 'Custom Digital Art',
                        'icon' => 'pen',
                    ],
                    [
                        'title' => 'Branding',
                        'subtitle' => 'Identity & Logos',
                        'icon' => 'vector',
                    ],
                    [
                        'title' => 'Graphic Design',
                        'subtitle' => 'Print & Digital',
                        'icon' => 'monitor',
                    ],
                ],
                'social_links' => [
                    [
                        'name' => 'Behance',
                        'url' => '#',
                        'icon' => 'behance',
                    ],
                    [
                        'name' => 'Instagram',
                        'url' => '#',
                        'icon' => 'instagram',
                    ],
                    [
                        'name' => 'Dribbble',
                        'url' => '#',
                        'icon' => 'dribbble',
                    ],
                    [
                        'name' => 'Email',
                        'url' => 'mailto:agusaffandi120@gmail.com',
                        'icon' => 'mail',
                    ],
                ],
                'is_active' => true,
            ]
        );

        return view('admin.hero-settings.edit', compact('heroSetting'));
    }

    public function update(Request $request)
    {
        $heroSetting = HeroSetting::firstOrCreate(['id' => 1]);

        $request->validate([
            'logo_image' => 'nullable|file|mimes:jpg,jpeg,png,webp,svg|max:4096',
            'brand_image' => 'nullable|file|mimes:jpg,jpeg,png,webp,svg|max:4096',
            'hero_title_image' => 'nullable|file|mimes:jpg,jpeg,png,webp,svg|max:8192',
            'hero_character_desktop' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240',
            'hero_character_mobile' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:6144',
            'hero_background_image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240',
            'signature_image' => 'nullable|file|mimes:jpg,jpeg,png,webp,svg|max:4096',

            'welcome_text' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',

            'primary_button_text' => 'nullable|string|max:255',
            'primary_button_link' => 'nullable|string|max:255',
            'secondary_button_text' => 'nullable|string|max:255',
            'secondary_button_link' => 'nullable|string|max:255',

            'stats' => 'nullable|array',
            'stats.*.number' => 'nullable|string|max:50',
            'stats.*.label' => 'nullable|string|max:255',
            'stats.*.icon' => 'nullable|string|max:100',

            'service_cards' => 'nullable|array',
            'service_cards.*.title' => 'nullable|string|max:255',
            'service_cards.*.subtitle' => 'nullable|string|max:255',
            'service_cards.*.icon' => 'nullable|string|max:100',

            'social_links' => 'nullable|array',
            'social_links.*.name' => 'nullable|string|max:255',
            'social_links.*.url' => 'nullable|string|max:255',
            'social_links.*.icon' => 'nullable|string|max:100',

            'is_active' => 'nullable|boolean',
        ]);

        $data = [
            'welcome_text' => $request->welcome_text ?? 'WELCOME TO',
            'subtitle' => $request->subtitle ?? 'CREATIVE STUDIO & DIGITAL ART AGENCY',
            'description' => $request->description,

            'primary_button_text' => $request->primary_button_text ?? 'Explore Portfolio',
            'primary_button_link' => $request->primary_button_link ?? '#portfolio',
            'secondary_button_text' => $request->secondary_button_text ?? 'Start Project',
            'secondary_button_link' => $request->secondary_button_link ?? '#contact',

            'stats' => $this->cleanArrayData($request->stats ?? []),
            'service_cards' => $this->cleanArrayData($request->service_cards ?? []),
            'social_links' => $this->cleanArrayData($request->social_links ?? []),

            'is_active' => $request->boolean('is_active'),
        ];

        $imageFields = [
            'logo_image',
            'brand_image',
            'hero_title_image',
            'hero_character_desktop',
            'hero_character_mobile',
            'hero_background_image',
            'signature_image',
        ];

        foreach ($imageFields as $field) {
            if ($request->hasFile($field)) {
                if ($heroSetting->{$field}) {
                    Storage::disk('public')->delete($heroSetting->{$field});
                }

                $data[$field] = $request->file($field)->store('hero_settings', 'public');
            }
        }

        $heroSetting->update($data);

        return redirect()
            ->route('admin.hero-settings.edit')
            ->with('success', 'Hero Section berhasil diperbarui!');
    }

    private function cleanArrayData(array $items): array
    {
        return collect($items)
            ->filter(function ($item) {
                if (!is_array($item)) {
                    return false;
                }

                return collect($item)
                    ->filter(fn ($value) => filled($value))
                    ->isNotEmpty();
            })
            ->values()
            ->toArray();
    }
}