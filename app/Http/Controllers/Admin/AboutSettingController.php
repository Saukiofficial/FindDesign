<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutSettingController extends Controller
{
    public function edit()
    {
        $aboutSetting = AboutSetting::firstOrCreate(
            ['id' => 1],
            [
                'badge_text' => 'About Us',
                'title' => 'Meet The Founder',
                'founder_name' => 'Afandy',
                'founder_position' => 'Founder & Creative Director',
                'quote' => '"Agus Afandy – Owner of FindDesign and Professional Illustrator who has been creating since 2015."',
                'description_1' => 'Founded in 2015, FindDesign started as a simple pencil stroke and has now brought to life 500+ projects for clients worldwide.',
                'description_2' => 'With over 8 years of experience in the creative industry, I believe that every brand has a unique story worth telling through captivating visuals.',
                'stats' => [
                    [
                        'number' => '500+',
                        'label' => 'Projects Completed',
                    ],
                    [
                        'number' => '480+',
                        'label' => 'Happy Clients',
                    ],
                    [
                        'number' => '8+',
                        'label' => 'Years Experience',
                    ],
                    [
                        'number' => '500+',
                        'label' => 'Portfolio',
                    ],
                ],
                'values' => [
                    [
                        'title' => 'Innovation',
                        'description' => 'We constantly push boundaries to create unique and innovative designs that set new standards.',
                    ],
                    [
                        'title' => 'Quality',
                        'description' => 'Every project is crafted with meticulous attention to detail and precision.',
                    ],
                    [
                        'title' => 'Collaboration',
                        'description' => 'We work closely with clients to bring their vision to life through transparent communication.',
                    ],
                    [
                        'title' => 'Excellence',
                        'description' => 'Fast delivery without compromising on quality, ensuring exceptional results every time.',
                    ],
                ],
                'is_active' => true,
            ]
        );

        return view('admin.about-settings.edit', compact('aboutSetting'));
    }

    public function update(Request $request)
    {
        $aboutSetting = AboutSetting::firstOrCreate(['id' => 1]);

        $request->validate([
            'badge_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',

            'founder_image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:8192',
            'founder_name' => 'nullable|string|max:255',
            'founder_position' => 'nullable|string|max:255',

            'quote' => 'nullable|string',
            'description_1' => 'nullable|string',
            'description_2' => 'nullable|string',

            'stats' => 'nullable|array',
            'stats.*.number' => 'nullable|string|max:50',
            'stats.*.label' => 'nullable|string|max:255',

            'values' => 'nullable|array',
            'values.*.title' => 'nullable|string|max:255',
            'values.*.description' => 'nullable|string',

            'is_active' => 'nullable|boolean',
        ]);

        $data = [
            'badge_text' => $request->badge_text ?? 'About Us',
            'title' => $request->title ?? 'Meet The Founder',

            'founder_name' => $request->founder_name ?? 'Afandy',
            'founder_position' => $request->founder_position ?? 'Founder & Creative Director',

            'quote' => $request->quote,
            'description_1' => $request->description_1,
            'description_2' => $request->description_2,

            'stats' => $this->cleanArrayData($request->stats ?? []),
            'values' => $this->cleanArrayData($request->values ?? []),

            'is_active' => $request->boolean('is_active'),
        ];

        if ($request->hasFile('founder_image')) {
            if ($aboutSetting->founder_image) {
                Storage::disk('public')->delete($aboutSetting->founder_image);
            }

            $data['founder_image'] = $request->file('founder_image')->store('about_settings', 'public');
        }

        $aboutSetting->update($data);

        return redirect()
            ->route('admin.about-settings.edit')
            ->with('success', 'About Section berhasil diperbarui!');
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