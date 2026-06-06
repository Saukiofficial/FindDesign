<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceSettingController extends Controller
{
    public function edit()
    {
        $serviceSetting = ServiceSetting::firstOrCreate(
            ['id' => 1],
            [
                'badge_text' => 'WHAT WE OFFER',
                'title_white' => 'OUR',
                'title_red' => 'SERVICES',
                'description' => 'From dark imagination to stunning visuals, we deliver premium creative solutions tailored for you.',
                'service_cards' => [
                    [
                        'title' => 'ILLUSTRATION DESIGN',
                        'short_description' => 'Custom illustrations that bring your stories to life',
                        'icon_text' => '🎨',
                        'icon_image' => null,
                        'features' => [
                            'Character Design & Development',
                            'Book & Editorial Illustrations',
                            'Concept Art & Storyboards',
                            'Fantasy & Sci-Fi Artwork',
                            'Children\'s Book Illustrations',
                        ],
                    ],
                    [
                        'title' => 'DIGITAL ART',
                        'short_description' => 'Stunning digital paintings and visual masterpieces',
                        'icon_text' => '🖼️',
                        'icon_image' => null,
                        'features' => [
                            'Digital Painting & Portraits',
                            'Landscape & Environment Art',
                            'Abstract & Conceptual Art',
                            'Photo Manipulation',
                            'Matte Painting',
                        ],
                    ],
                    [
                        'title' => 'ANIMATION',
                        'short_description' => 'Bringing your ideas to life with motion',
                        'icon_text' => '🎬',
                        'icon_image' => null,
                        'features' => [
                            '2D Character Animation',
                            'Motion Graphics & Logo Animation',
                            'Explainer Videos',
                            'UI/UX Micro-interactions',
                            'Social Media Content',
                        ],
                    ],
                ],
                'is_active' => true,
            ]
        );

        return view('admin.service-settings.edit', compact('serviceSetting'));
    }

    public function update(Request $request)
    {
        $serviceSetting = ServiceSetting::firstOrCreate(['id' => 1]);

        $request->validate([
            'badge_text' => 'nullable|string|max:255',
            'title_white' => 'nullable|string|max:255',
            'title_red' => 'nullable|string|max:255',
            'description' => 'nullable|string',

            'background_image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:8192',
            'character_image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:8192',

            'service_cards' => 'nullable|array',
            'service_cards.*.title' => 'nullable|string|max:255',
            'service_cards.*.short_description' => 'nullable|string|max:255',
            'service_cards.*.icon_text' => 'nullable|string|max:50',
            'service_cards.*.icon_image_upload' => 'nullable|file|mimes:jpg,jpeg,png,webp,svg|max:8192',
            'service_cards.*.features' => 'nullable|array',
            'service_cards.*.features.*' => 'nullable|string|max:255',

            'is_active' => 'nullable|boolean',
        ]);

        $data = [
            'badge_text' => $request->badge_text ?? 'WHAT WE OFFER',
            'title_white' => $request->title_white ?? 'OUR',
            'title_red' => $request->title_red ?? 'SERVICES',
            'description' => $request->description,
            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('background_image')) {
            if ($serviceSetting->background_image) {
                Storage::disk('public')->delete($serviceSetting->background_image);
            }

            $data['background_image'] = $request->file('background_image')->store('service_settings', 'public');
        }

        if ($request->hasFile('character_image')) {
            if ($serviceSetting->character_image) {
                Storage::disk('public')->delete($serviceSetting->character_image);
            }

            $data['character_image'] = $request->file('character_image')->store('service_settings', 'public');
        }

        $oldCards = $serviceSetting->service_cards ?? [];
        $cards = [];

        foreach (($request->service_cards ?? []) as $index => $card) {
            $oldCard = $oldCards[$index] ?? [];

            $features = collect($card['features'] ?? [])
                ->filter(fn ($feature) => filled($feature))
                ->values()
                ->toArray();

            $iconImage = $oldCard['icon_image'] ?? null;

            if ($request->hasFile("service_cards.$index.icon_image_upload")) {
                if ($iconImage) {
                    Storage::disk('public')->delete($iconImage);
                }

                $iconImage = $request
                    ->file("service_cards.$index.icon_image_upload")
                    ->store('service_settings/icons', 'public');
            }

            $hasContent = filled($card['title'] ?? null)
                || filled($card['short_description'] ?? null)
                || filled($card['icon_text'] ?? null)
                || filled($iconImage)
                || count($features) > 0;

            if (!$hasContent) {
                continue;
            }

            $cards[] = [
                'title' => $card['title'] ?? '',
                'short_description' => $card['short_description'] ?? '',
                'icon_text' => $card['icon_text'] ?? '',
                'icon_image' => $iconImage,
                'features' => $features,
            ];
        }

        $data['service_cards'] = $cards;

        $serviceSetting->update($data);

        return redirect()
            ->route('admin.service-settings.edit')
            ->with('success', 'Our Services berhasil diperbarui!');
    }
}