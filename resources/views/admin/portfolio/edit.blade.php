@extends('layouts.admin')

@section('page-title', 'Edit Portfolio')

@section('content')
<div class="space-y-8">

    {{-- HEADER --}}
    <div class="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-gray-900 via-red-950/40 to-black p-8 shadow-2xl">
        <div class="relative z-10">
            <div class="mb-3 inline-flex rounded-full border border-red-500/40 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-red-400">
                Edit Portfolio
            </div>

            <h1 class="text-3xl md:text-4xl font-black text-white">
                {{ $portfolioItem->title }}
            </h1>

            <p class="mt-2 max-w-2xl text-sm text-gray-400">
                Perbarui detail portfolio, kategori, deskripsi, dan gambar karya.
            </p>
        </div>

        <div class="absolute right-0 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"></div>
        <div class="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-red-900/30 blur-3xl"></div>
    </div>

    {{-- ERRORS --}}
    @if ($errors->any())
        <div class="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            <div class="mb-2 font-bold">Terjadi kesalahan:</div>
            <ul class="list-inside list-disc space-y-1 text-sm">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form
        action="{{ route('admin.portfolio.update', $portfolioItem->id) }}"
        method="POST"
        enctype="multipart/form-data"
        class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
    >
        @csrf
        @method('PUT')

        {{-- PREVIEW --}}
        <div class="rounded-3xl border border-gray-700/70 bg-gray-900 p-6 shadow-2xl">
            <h2 class="mb-4 text-xl font-bold text-white">
                Preview Gambar
            </h2>

            <div class="overflow-hidden rounded-3xl border border-red-500/20 bg-black shadow-lg">
                <img
                    src="{{ asset('storage/' . $portfolioItem->image) }}"
                    alt="{{ $portfolioItem->title }}"
                    class="max-h-[520px] w-full object-contain"
                >
            </div>

            <div class="mt-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
                <div class="text-sm font-bold text-red-300">
                    {{ $portfolioItem->category }}
                </div>
                <div class="mt-1 text-sm text-gray-400">
                    {{ $portfolioItem->description ?: 'Belum ada deskripsi.' }}
                </div>
            </div>
        </div>

        {{-- FORM --}}
        <div class="rounded-3xl border border-gray-700/70 bg-gray-900 p-6 shadow-2xl">
            <h2 class="mb-6 text-xl font-bold text-white">
                Detail Portfolio
            </h2>

            <div class="space-y-6">
                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Judul Portfolio
                    </label>
                    <input
                        type="text"
                        name="title"
                        value="{{ old('title', $portfolioItem->title) }}"
                        required
                        class="w-full rounded-xl border-gray-700 bg-gray-950 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Kategori
                    </label>
                    <select
                        name="category"
                        required
                        class="w-full rounded-xl border-gray-700 bg-gray-950 text-white focus:border-red-500 focus:ring-red-500"
                    >
                        @foreach ($categories as $category)
                            <option
                                value="{{ $category }}"
                                {{ old('category', $portfolioItem->category) === $category ? 'selected' : '' }}
                            >
                                {{ $category }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Deskripsi
                    </label>
                    <textarea
                        name="description"
                        rows="6"
                        class="w-full rounded-xl border-gray-700 bg-gray-950 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                        placeholder="Tuliskan deskripsi karya..."
                    >{{ old('description', $portfolioItem->description) }}</textarea>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Ganti Gambar
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-red-700"
                    >
                    <p class="mt-2 text-xs text-gray-500">
                        Kosongkan jika tidak ingin mengganti gambar.
                    </p>
                </div>

                <div class="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                    <a
                        href="{{ route('admin.portfolio.index') }}"
                        class="inline-flex justify-center rounded-xl border border-gray-600 bg-gray-800 px-6 py-3 text-sm font-bold text-gray-200 transition hover:bg-gray-700"
                    >
                        Batal
                    </a>

                    <button
                        type="submit"
                        class="inline-flex justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:from-red-700 hover:to-red-900"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection