@extends('layouts.admin')

@section('page-title', 'Hero Section Settings')

@section('content')
<div class="space-y-8">

    {{-- Header --}}
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900 via-red-800 to-red-950 p-8 shadow-2xl border border-red-700/30">
        <div class="relative z-10">
            <h1 class="text-3xl font-bold text-white mb-2">
                Hero Section Settings
            </h1>
            <p class="text-red-100 max-w-3xl">
                Kelola tampilan hero utama website Fiind Design, mulai dari logo, gambar tulisan, karakter, background, tombol, statistik, social link, dan service card.
            </p>
        </div>

        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
    </div>

    {{-- Success --}}
    @if (session('success'))
        <div class="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300">
            {{ session('success') }}
        </div>
    @endif

    {{-- Error --}}
    @if ($errors->any())
        <div class="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            <div class="font-semibold mb-2">Ada kesalahan:</div>
            <ul class="list-disc list-inside space-y-1 text-sm">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form
        action="{{ route('admin.hero-settings.update') }}"
        method="POST"
        enctype="multipart/form-data"
        class="space-y-8"
    >
        @csrf
        @method('PUT')

        {{-- STATUS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="flex items-center gap-3">
                <input
                    type="checkbox"
                    name="is_active"
                    value="1"
                    id="is_active"
                    class="rounded border-gray-600 bg-gray-900 text-red-600 focus:ring-red-500"
                    {{ old('is_active', $heroSetting->is_active) ? 'checked' : '' }}
                >

                <label for="is_active" class="text-sm font-semibold text-gray-200">
                    Aktifkan Hero Section
                </label>
            </div>
        </div>

        {{-- IMAGE SETTINGS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">Gambar Hero</h2>
                <p class="mt-1 text-sm text-gray-400">
                    Upload gambar utama hero. Disarankan menggunakan format WebP agar ringan di HP/iPhone.
                </p>
            </div>

            @php
                $imageFields = [
                    'logo_image' => 'Logo Navbar',
                    'brand_image' => 'Brand Image / Logo Text Kecil',
                    'hero_title_image' => 'Gambar Tulisan Besar FIIND DESIGN',
                    'hero_character_desktop' => 'Karakter Hero Desktop',
                    'hero_character_mobile' => 'Karakter Hero Mobile',
                    'hero_background_image' => 'Background Hero',
                    'signature_image' => 'Signature Image / Create Impact',
                ];
            @endphp

            <div class="grid gap-6 md:grid-cols-2">
                @foreach ($imageFields as $field => $label)
                    <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                        <label class="mb-3 block text-sm font-semibold text-gray-200">
                            {{ $label }}
                        </label>

                        @if ($heroSetting->{$field . '_url'})
                            <div class="mb-4 rounded-xl border border-gray-700 bg-gray-950 p-4">
                                <img
                                    src="{{ $heroSetting->{$field . '_url'} }}"
                                    alt="{{ $label }}"
                                    class="max-h-40 rounded-lg object-contain"
                                >
                            </div>
                        @endif

                        <input
                            type="file"
                            name="{{ $field }}"
                            accept=".jpg,.jpeg,.png,.webp,.svg"
                            class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                        >

                        <p class="mt-2 text-xs text-gray-500">
                            Kosongkan jika tidak ingin mengganti gambar.
                        </p>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- TEXT SETTINGS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">Konten Teks Hero</h2>
                <p class="mt-1 text-sm text-gray-400">
                    Ubah teks kecil, subtitle, deskripsi, dan tombol hero.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Welcome Text
                    </label>
                    <input
                        type="text"
                        name="welcome_text"
                        value="{{ old('welcome_text', $heroSetting->welcome_text) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="WELCOME TO"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Subtitle
                    </label>
                    <input
                        type="text"
                        name="subtitle"
                        value="{{ old('subtitle', $heroSetting->subtitle) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="CREATIVE STUDIO & DIGITAL ART AGENCY"
                    >
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="We craft bold visuals..."
                    >{{ old('description', $heroSetting->description) }}</textarea>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Primary Button Text
                    </label>
                    <input
                        type="text"
                        name="primary_button_text"
                        value="{{ old('primary_button_text', $heroSetting->primary_button_text) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Explore Portfolio"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Primary Button Link
                    </label>
                    <input
                        type="text"
                        name="primary_button_link"
                        value="{{ old('primary_button_link', $heroSetting->primary_button_link) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="#portfolio"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Secondary Button Text
                    </label>
                    <input
                        type="text"
                        name="secondary_button_text"
                        value="{{ old('secondary_button_text', $heroSetting->secondary_button_text) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Start Project"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Secondary Button Link
                    </label>
                    <input
                        type="text"
                        name="secondary_button_link"
                        value="{{ old('secondary_button_link', $heroSetting->secondary_button_link) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="#contact"
                    >
                </div>
            </div>
        </div>

        {{-- STATS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">Statistik Hero</h2>
                <p class="mt-1 text-sm text-gray-400">
                    Contoh: 200+ Projects Completed, 50+ Happy Clients, 8+ Years Experience.
                </p>
            </div>

            @php
                $stats = old('stats', $heroSetting->stats ?? []);
            @endphp

            <div class="grid gap-5 md:grid-cols-3">
                @for ($i = 0; $i < 3; $i++)
                    <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                        <h3 class="mb-4 font-semibold text-white">
                            Stat {{ $i + 1 }}
                        </h3>

                        <div class="space-y-4">
                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Number
                                </label>
                                <input
                                    type="text"
                                    name="stats[{{ $i }}][number]"
                                    value="{{ $stats[$i]['number'] ?? '' }}"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                    placeholder="200+"
                                >
                            </div>

                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    name="stats[{{ $i }}][label]"
                                    value="{{ $stats[$i]['label'] ?? '' }}"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                    placeholder="Projects Completed"
                                >
                            </div>

                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Icon
                                </label>

                                @php
                                    $selectedIcon = $stats[$i]['icon'] ?? '';
                                @endphp

                                <select
                                    name="stats[{{ $i }}][icon]"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 focus:border-red-500 focus:ring-red-500"
                                >
                                    <option value="diamond" {{ $selectedIcon === 'diamond' ? 'selected' : '' }}>Diamond</option>
                                    <option value="star" {{ $selectedIcon === 'star' ? 'selected' : '' }}>Star</option>
                                    <option value="bolt" {{ $selectedIcon === 'bolt' ? 'selected' : '' }}>Bolt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>

        {{-- SERVICE CARDS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">Service Cards Hero</h2>
                <p class="mt-1 text-sm text-gray-400">
                    Kartu layanan kecil di bagian bawah hero.
                </p>
            </div>

            @php
                $serviceCards = old('service_cards', $heroSetting->service_cards ?? []);
            @endphp

            <div class="grid gap-5 md:grid-cols-3">
                @for ($i = 0; $i < 3; $i++)
                    <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                        <h3 class="mb-4 font-semibold text-white">
                            Service {{ $i + 1 }}
                        </h3>

                        <div class="space-y-4">
                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="service_cards[{{ $i }}][title]"
                                    value="{{ $serviceCards[$i]['title'] ?? '' }}"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                    placeholder="Illustration"
                                >
                            </div>

                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    name="service_cards[{{ $i }}][subtitle]"
                                    value="{{ $serviceCards[$i]['subtitle'] ?? '' }}"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                    placeholder="Custom Digital Art"
                                >
                            </div>

                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Icon
                                </label>

                                @php
                                    $selectedIcon = $serviceCards[$i]['icon'] ?? '';
                                @endphp

                                <select
                                    name="service_cards[{{ $i }}][icon]"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 focus:border-red-500 focus:ring-red-500"
                                >
                                    <option value="pen" {{ $selectedIcon === 'pen' ? 'selected' : '' }}>Pen</option>
                                    <option value="vector" {{ $selectedIcon === 'vector' ? 'selected' : '' }}>Vector</option>
                                    <option value="monitor" {{ $selectedIcon === 'monitor' ? 'selected' : '' }}>Monitor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>

        {{-- SOCIAL LINKS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">Social Links Hero</h2>
                <p class="mt-1 text-sm text-gray-400">
                    Icon sosial di sisi kanan hero.
                </p>
            </div>

            @php
                $socialLinks = old('social_links', $heroSetting->social_links ?? []);
            @endphp

            <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                @for ($i = 0; $i < 4; $i++)
                    <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-5">
                        <h3 class="mb-4 font-semibold text-white">
                            Social {{ $i + 1 }}
                        </h3>

                        <div class="space-y-4">
                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="social_links[{{ $i }}][name]"
                                    value="{{ $socialLinks[$i]['name'] ?? '' }}"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                    placeholder="Instagram"
                                >
                            </div>

                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    name="social_links[{{ $i }}][url]"
                                    value="{{ $socialLinks[$i]['url'] ?? '' }}"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                    placeholder="https://instagram.com/..."
                                >
                            </div>

                            <div>
                                <label class="mb-1 block text-xs font-semibold text-gray-400">
                                    Icon
                                </label>

                                @php
                                    $selectedIcon = $socialLinks[$i]['icon'] ?? '';
                                @endphp

                                <select
                                    name="social_links[{{ $i }}][icon]"
                                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 focus:border-red-500 focus:ring-red-500"
                                >
                                    <option value="behance" {{ $selectedIcon === 'behance' ? 'selected' : '' }}>Behance</option>
                                    <option value="instagram" {{ $selectedIcon === 'instagram' ? 'selected' : '' }}>Instagram</option>
                                    <option value="dribbble" {{ $selectedIcon === 'dribbble' ? 'selected' : '' }}>Dribbble</option>
                                    <option value="mail" {{ $selectedIcon === 'mail' ? 'selected' : '' }}>Email</option>
                                </select>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>

        {{-- ACTION BUTTON --}}
        <div class="flex flex-col sm:flex-row justify-end gap-3">
            <a
                href="{{ route('dashboard') }}"
                class="inline-flex items-center justify-center rounded-xl border border-gray-600 bg-gray-800 px-6 py-3 text-sm font-bold text-gray-200 hover:bg-gray-700 transition"
            >
                Kembali
            </a>

            <button
                type="submit"
                class="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition"
            >
                Simpan Hero Section
            </button>
        </div>
    </form>
</div>
@endsection