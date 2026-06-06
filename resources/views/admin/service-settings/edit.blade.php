@extends('layouts.admin')

@section('page-title', 'Our Services Settings')

@section('content')
<div class="space-y-8">

    {{-- HEADER --}}
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900 via-red-800 to-red-950 p-8 shadow-2xl border border-red-700/30">
        <div class="relative z-10">
            <h1 class="text-3xl font-bold text-white mb-2">
                Our Services Settings
            </h1>
            <p class="text-red-100 max-w-3xl">
                Kelola tampilan Our Services di halaman depan, mulai dari heading, background, karakter, icon card, judul, deskripsi, dan daftar fitur layanan.
            </p>
        </div>

        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
    </div>

    {{-- SUCCESS --}}
    @if (session('success'))
        <div class="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300">
            {{ session('success') }}
        </div>
    @endif

    {{-- ERRORS --}}
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
        action="{{ route('admin.service-settings.update') }}"
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
                    {{ old('is_active', $serviceSetting->is_active) ? 'checked' : '' }}
                >

                <label for="is_active" class="text-sm font-semibold text-gray-200">
                    Aktifkan Our Services Section
                </label>
            </div>
        </div>

        {{-- MAIN CONTENT --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">
                    Konten Utama Section
                </h2>
                <p class="mt-1 text-sm text-gray-400">
                    Bagian ini mengatur badge, judul, deskripsi, background, dan karakter tengah.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Badge Text
                    </label>
                    <input
                        type="text"
                        name="badge_text"
                        value="{{ old('badge_text', $serviceSetting->badge_text) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="WHAT WE OFFER"
                    >
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="mb-2 block text-sm font-semibold text-gray-300">
                            Title White
                        </label>
                        <input
                            type="text"
                            name="title_white"
                            value="{{ old('title_white', $serviceSetting->title_white) }}"
                            class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                            placeholder="OUR"
                        >
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-semibold text-gray-300">
                            Title Red
                        </label>
                        <input
                            type="text"
                            name="title_red"
                            value="{{ old('title_red', $serviceSetting->title_red) }}"
                            class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                            placeholder="SERVICES"
                        >
                    </div>
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows="3"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="From dark imagination to stunning visuals..."
                    >{{ old('description', $serviceSetting->description) }}</textarea>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Background Image
                    </label>

                    @if ($serviceSetting->background_image_url)
                        <div class="mb-4 rounded-xl border border-gray-700 bg-gray-950 p-4">
                            <img
                                src="{{ $serviceSetting->background_image_url }}"
                                alt="Background Image"
                                class="max-h-52 rounded-lg object-contain"
                            >
                        </div>
                    @endif

                    <input
                        type="file"
                        name="background_image"
                        accept=".jpg,.jpeg,.png,.webp"
                        class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                    >

                    <p class="mt-2 text-xs text-gray-500">
                        Kosongkan jika tidak ingin mengganti. Disarankan gambar gelap merah ukuran landscape.
                    </p>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Character Image
                    </label>

                    @if ($serviceSetting->character_image_url)
                        <div class="mb-4 rounded-xl border border-gray-700 bg-gray-950 p-4">
                            <img
                                src="{{ $serviceSetting->character_image_url }}"
                                alt="Character Image"
                                class="max-h-52 rounded-lg object-contain"
                            >
                        </div>
                    @endif

                    <input
                        type="file"
                        name="character_image"
                        accept=".jpg,.jpeg,.png,.webp"
                        class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                    >

                    <p class="mt-2 text-xs text-gray-500">
                        Kosongkan jika tidak ingin mengganti. Karakter akan tampil di tengah belakang card.
                    </p>
                </div>
            </div>
        </div>

        {{-- SERVICE CARDS --}}
        @php
            $cards = old('service_cards', $serviceSetting->service_cards ?? []);
        @endphp

        <div class="space-y-6">
            <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
                <div class="mb-6">
                    <h2 class="text-xl font-bold text-white">
                        Service Cards
                    </h2>
                    <p class="mt-1 text-sm text-gray-400">
                        Atur 3 kartu layanan utama yang tampil di frontend.
                    </p>
                </div>

                <div class="grid gap-6">
                    @for ($i = 0; $i < 3; $i++)
                        @php
                            $card = $cards[$i] ?? [];
                            $features = $card['features'] ?? [];
                            $iconImage = $card['icon_image'] ?? null;
                        @endphp

                        <div class="rounded-3xl border border-red-500/20 bg-gray-900/70 p-6">
                            <div class="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <h3 class="text-lg font-bold text-white">
                                        Service Card {{ $i + 1 }}
                                    </h3>
                                    <p class="text-sm text-gray-400">
                                        Judul, deskripsi, icon, dan daftar fitur.
                                    </p>
                                </div>

                                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/20 text-xl">
                                    {{ $card['icon_text'] ?? '💀' }}
                                </div>
                            </div>

                            <div class="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="service_cards[{{ $i }}][title]"
                                        value="{{ $card['title'] ?? '' }}"
                                        class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                        placeholder="ILLUSTRATION DESIGN"
                                    >
                                </div>

                                <div>
                                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                                        Icon Text / Emoji
                                    </label>
                                    <input
                                        type="text"
                                        name="service_cards[{{ $i }}][icon_text]"
                                        value="{{ $card['icon_text'] ?? '' }}"
                                        class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                        placeholder="🎨"
                                    >
                                </div>

                                <div class="md:col-span-2">
                                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                                        Short Description
                                    </label>
                                    <input
                                        type="text"
                                        name="service_cards[{{ $i }}][short_description]"
                                        value="{{ $card['short_description'] ?? '' }}"
                                        class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                        placeholder="Custom illustrations that bring your stories to life"
                                    >
                                </div>

                                <div class="md:col-span-2">
                                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                                        Icon Image
                                    </label>

                                    @if ($iconImage)
                                        <div class="mb-4 rounded-xl border border-gray-700 bg-gray-950 p-4">
                                            <img
                                                src="{{ asset('storage/' . ltrim($iconImage, '/')) }}"
                                                alt="Icon Image"
                                                class="max-h-24 rounded-lg object-contain"
                                            >
                                        </div>
                                    @endif

                                    <input
                                        type="file"
                                        name="service_cards[{{ $i }}][icon_image_upload]"
                                        accept=".jpg,.jpeg,.png,.webp,.svg"
                                        class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                                    >

                                    <p class="mt-2 text-xs text-gray-500">
                                        Bisa pakai PNG/WebP transparan. Jika kosong, frontend akan memakai emoji/icon text.
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6">
                                <label class="mb-3 block text-sm font-semibold text-gray-300">
                                    Features
                                </label>

                                <div class="grid gap-3 md:grid-cols-2">
                                    @for ($f = 0; $f < 5; $f++)
                                        <input
                                            type="text"
                                            name="service_cards[{{ $i }}][features][{{ $f }}]"
                                            value="{{ $features[$f] ?? '' }}"
                                            class="w-full rounded-xl border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                            placeholder="Feature {{ $f + 1 }}"
                                        >
                                    @endfor
                                </div>
                            </div>
                        </div>
                    @endfor
                </div>
            </div>
        </div>

        {{-- PREVIEW HELP --}}
        <div class="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
            <h2 class="mb-3 text-lg font-bold text-white">
                Panduan Gambar
            </h2>

            <div class="grid gap-4 text-sm text-gray-300 md:grid-cols-3">
                <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-4">
                    <div class="font-semibold text-red-400">Background</div>
                    <p class="mt-1 text-gray-400">Gunakan gambar gelap/merah rasio landscape agar mirip referensi.</p>
                </div>

                <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-4">
                    <div class="font-semibold text-red-400">Character</div>
                    <p class="mt-1 text-gray-400">Gunakan PNG/WebP karakter tengah dengan background transparan jika ada.</p>
                </div>

                <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-4">
                    <div class="font-semibold text-red-400">Icon Card</div>
                    <p class="mt-1 text-gray-400">Icon kecil akan tampil di lingkaran atas card service.</p>
                </div>
            </div>
        </div>

        {{-- ACTION --}}
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
                Simpan Our Services
            </button>
        </div>
    </form>
</div>
@endsection