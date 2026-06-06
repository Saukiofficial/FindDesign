@extends('layouts.admin')

@section('page-title', 'Portfolio Management')

@section('content')
<div class="space-y-8">

    {{-- HEADER --}}
    <div class="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-gray-900 via-red-950/40 to-black p-8 shadow-2xl">
        <div class="relative z-10">
            <div class="mb-3 inline-flex rounded-full border border-red-500/40 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-red-400">
                Portfolio Admin
            </div>

            <h1 class="text-3xl md:text-4xl font-black text-white">
                Portfolio Management
            </h1>

            <p class="mt-2 max-w-2xl text-sm text-gray-400">
                Kelola karya portfolio yang akan tampil di frontend dengan tema dark red premium.
            </p>
        </div>

        <div class="absolute right-0 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"></div>
        <div class="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-red-900/30 blur-3xl"></div>
    </div>

    {{-- ALERT SUCCESS --}}
    @if (session('success'))
        <div class="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-300">
            {{ session('success') }}
        </div>
    @endif

    {{-- ALERT ERROR --}}
    @if (session('error'))
        <div class="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {{ session('error') }}
        </div>
    @endif

    {{-- VALIDATION --}}
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

    {{-- FORM TAMBAH --}}
    <div class="relative overflow-hidden rounded-3xl border border-gray-700/70 bg-gray-900 p-6 shadow-2xl">
        <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/10 blur-3xl"></div>

        <div class="relative z-10 mb-6 flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-900 shadow-lg shadow-red-900/40">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
            </div>

            <div>
                <h2 class="text-xl font-bold text-white">
                    Tambah Portfolio Baru
                </h2>
                <p class="text-sm text-gray-400">
                    Upload karya terbaru dan isi detailnya.
                </p>
            </div>
        </div>

        <form
            action="{{ route('admin.portfolio.store') }}"
            method="POST"
            enctype="multipart/form-data"
            class="relative z-10 space-y-6"
        >
            @csrf

            <div class="grid gap-6 lg:grid-cols-3">
                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Judul Portfolio
                    </label>
                    <input
                        type="text"
                        name="title"
                        value="{{ old('title') }}"
                        required
                        placeholder="Contoh: Dark Skull Illustration"
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
                        <option value="" disabled selected>Pilih Kategori</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category }}" {{ old('category') === $category ? 'selected' : '' }}>
                                {{ $category }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-gray-300">
                        Upload Gambar
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        class="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-red-700"
                    >
                    <p class="mt-2 text-xs text-gray-500">
                        Format JPG, PNG, WEBP, SVG, GIF. Max 50MB.
                    </p>
                </div>
            </div>

            <div>
                <label class="mb-2 block text-sm font-semibold text-gray-300">
                    Deskripsi
                </label>
                <textarea
                    name="description"
                    rows="4"
                    placeholder="Tuliskan deskripsi singkat karya ini..."
                    class="w-full rounded-xl border-gray-700 bg-gray-950 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                >{{ old('description') }}</textarea>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:from-red-700 hover:to-red-900"
                >
                    <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Tambah Portfolio
                </button>
            </div>
        </form>
    </div>

    {{-- LIST --}}
    <div class="relative overflow-hidden rounded-3xl border border-gray-700/70 bg-gray-900 shadow-2xl">
        <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-800/10 blur-3xl"></div>

        <div class="relative z-10 border-b border-gray-700/60 px-6 py-5">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-900 shadow-lg shadow-red-900/40">
                        <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                    </div>

                    <div>
                        <h2 class="text-xl font-bold text-white">
                            Daftar Portfolio
                        </h2>
                        <p class="text-sm text-gray-400">
                            Total: {{ $portfolioItems->count() }} item
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative z-10 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700/50">
                <thead class="bg-black/30">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                            Preview
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                            Detail
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                            Kategori
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-gray-400">
                            Aksi
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-700/40">
                    @forelse ($portfolioItems as $item)
                        <tr class="transition hover:bg-red-500/5">
                            <td class="px-6 py-5">
                                <div class="h-20 w-24 overflow-hidden rounded-2xl border border-red-500/20 bg-black shadow-lg">
                                    <img
                                        src="{{ asset('storage/' . $item->image) }}"
                                        alt="{{ $item->title }}"
                                        class="h-full w-full object-cover"
                                    >
                                </div>
                            </td>

                            <td class="px-6 py-5">
                                <div class="font-bold text-white">
                                    {{ $item->title }}
                                </div>
                                <div class="mt-1 max-w-xl text-sm text-gray-400 line-clamp-2">
                                    {{ $item->description ?: 'Belum ada deskripsi.' }}
                                </div>
                                <div class="mt-1 text-xs text-gray-600">
                                    ID: #{{ $item->id }}
                                </div>
                            </td>

                            <td class="px-6 py-5">
                                <span class="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
                                    {{ $item->category }}
                                </span>
                            </td>

                            <td class="px-6 py-5">
                                <div class="flex justify-center gap-3">
                                    <a
                                        href="{{ route('admin.portfolio.edit', $item->id) }}"
                                        class="inline-flex items-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
                                    >
                                        Edit
                                    </a>

                                    <form
                                        action="{{ route('admin.portfolio.destroy', $item->id) }}"
                                        method="POST"
                                        onsubmit="return confirm('Yakin ingin menghapus portfolio ini?')"
                                    >
                                        @csrf
                                        @method('DELETE')

                                        <button
                                            type="submit"
                                            class="inline-flex items-center rounded-xl border border-red-500/30 bg-black px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                                        >
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="px-6 py-14 text-center">
                                <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                                    <svg class="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                    </svg>
                                </div>
                                <div class="font-bold text-white">
                                    Belum ada portfolio
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    Tambahkan karya portfolio pertama kamu.
                                </p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection