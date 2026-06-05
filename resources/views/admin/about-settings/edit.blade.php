@extends('layouts.admin')

@section('page-title', 'About Section Settings')

@section('content')
<div class="space-y-8">

    {{-- HEADER --}}
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900 via-red-800 to-red-950 p-8 shadow-2xl border border-red-700/30">
        <div class="relative z-10">
            <h1 class="text-3xl font-bold text-white mb-2">
                About Section Settings
            </h1>
            <p class="text-red-100 max-w-3xl">
                Kelola konten About Section, mulai dari gambar founder, nama, jabatan, quote, deskripsi, dan statistik yang tampil di halaman depan.
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
        action="{{ route('admin.about-settings.update') }}"
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
                    {{ old('is_active', $aboutSetting->is_active) ? 'checked' : '' }}
                >

                <label for="is_active" class="text-sm font-semibold text-gray-200">
                    Aktifkan About Section
                </label>
            </div>
        </div>

        {{-- MAIN CONTENT --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">
                    Konten Utama About
                </h2>
                <p class="mt-1 text-sm text-gray-400">
                    Bagian ini mengatur badge, judul, gambar founder, nama, jabatan, quote, dan deskripsi.
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
                        value="{{ old('badge_text', $aboutSetting->badge_text) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="ABOUT US"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value="{{ old('title', $aboutSetting->title) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Meet The Founder"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Founder Name
                    </label>
                    <input
                        type="text"
                        name="founder_name"
                        value="{{ old('founder_name', $aboutSetting->founder_name) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Afandy"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Founder Position
                    </label>
                    <input
                        type="text"
                        name="founder_position"
                        value="{{ old('founder_position', $aboutSetting->founder_position) }}"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Founder & Creative Director"
                    >
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Founder Image
                    </label>

                    @if ($aboutSetting->founder_image_url)
                        <div class="mb-4 rounded-xl border border-gray-700 bg-gray-950 p-4">
                            <img
                                src="{{ $aboutSetting->founder_image_url }}"
                                alt="Founder Image"
                                class="max-h-72 rounded-lg object-contain"
                            >
                        </div>
                    @endif

                    <input
                        type="file"
                        name="founder_image"
                        accept=".jpg,.jpeg,.png,.webp"
                        class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                    >

                    <p class="mt-2 text-xs text-gray-500">
                        Kosongkan jika tidak ingin mengganti gambar. Disarankan pakai WebP/JPG ukuran ringan.
                    </p>
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Quote
                    </label>
                    <textarea
                        name="quote"
                        rows="3"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Design is not just what it looks like..."
                    >{{ old('quote', $aboutSetting->quote) }}</textarea>
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Description 1
                    </label>
                    <textarea
                        name="description_1"
                        rows="4"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Founded in 2015..."
                    >{{ old('description_1', $aboutSetting->description_1) }}</textarea>
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Description 2
                    </label>
                    <textarea
                        name="description_2"
                        rows="5"
                        class="w-full rounded-xl border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="What started as a passion..."
                    >{{ old('description_2', $aboutSetting->description_2) }}</textarea>

                    <p class="mt-2 text-xs text-gray-500">
                        Bisa gunakan enter untuk membuat paragraf baru.
                    </p>
                </div>
            </div>
        </div>

        {{-- STATS --}}
        <div class="rounded-3xl bg-gray-800 border border-gray-700/50 p-6 shadow-xl">
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white">
                    Statistik About
                </h2>
                <p class="mt-1 text-sm text-gray-400">
                    Statistik ini akan tampil di bagian bawah deskripsi About.
                </p>
            </div>

            @php
                $stats = old('stats', $aboutSetting->stats ?? []);
            @endphp

            <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                @for ($i = 0; $i < 4; $i++)
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
                                    placeholder="500+"
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
                        </div>
                    </div>
                @endfor
            </div>
        </div>

        {{-- PREVIEW HELP --}}
        <div class="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
            <h2 class="mb-3 text-lg font-bold text-white">
                Panduan Upload Gambar Founder
            </h2>

            <div class="grid gap-4 text-sm text-gray-300 md:grid-cols-3">
                <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-4">
                    <div class="font-semibold text-red-400">Format</div>
                    <p class="mt-1 text-gray-400">JPG, PNG, atau WebP.</p>
                </div>

                <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-4">
                    <div class="font-semibold text-red-400">Ukuran</div>
                    <p class="mt-1 text-gray-400">Disarankan 800×900 px atau rasio hampir kotak.</p>
                </div>

                <div class="rounded-2xl border border-gray-700 bg-gray-900/70 p-4">
                    <div class="font-semibold text-red-400">Optimasi</div>
                    <p class="mt-1 text-gray-400">Gunakan WebP agar lebih ringan di HP.</p>
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
                Simpan About Section
            </button>
        </div>
    </form>
</div>
@endsection