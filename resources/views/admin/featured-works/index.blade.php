@extends('layouts.admin')

@section('page-title', 'Featured Works Management')

@section('content')
    <div class="space-y-6 -m-6 lg:-m-8 p-6 lg:p-8">
        {{-- Header Section --}}
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Featured Works</h1>
                <p class="mt-1 text-sm text-gray-400">Kelola karya unggulan (Best Works) yang tampil di halaman About</p>
            </div>
        </div>

        {{-- Alert Success --}}
        @if (session('success'))
            <div class="bg-gradient-to-r from-red-900/20 to-red-800/20 border-l-4 border-red-500 p-4 rounded-xl shadow-lg backdrop-blur-sm">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-red-300">{{ session('success') }}</p>
                    </div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-red-400 hover:bg-red-800/30" onclick="this.parentElement.parentElement.remove()">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        @endif

        {{-- Alert Error --}}
        @if ($errors->any())
            <div class="bg-gradient-to-r from-red-900/30 to-red-800/30 border-l-4 border-red-500 p-4 rounded-xl shadow-lg backdrop-blur-sm">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3 flex-1">
                        <p class="text-sm font-semibold text-red-300 mb-2">Terjadi kesalahan:</p>
                        <ul class="list-disc list-inside text-sm text-red-400 space-y-1">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        {{-- Form Tambah Item --}}
        <div class="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden relative">
            <!-- Decorative gradient overlay -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full opacity-5 blur-3xl -mr-32 -mt-32"></div>

            <div class="px-6 py-5 border-b border-gray-700/50 relative z-10">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/50">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white">Tambah Featured Work</h3>
                        <p class="text-sm text-gray-400">Upload karya terbaik untuk ditampilkan di section Featured Works</p>
                    </div>
                </div>
            </div>

            <div class="p-6 relative z-10">
                <form action="{{ route('admin.featured-works.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     
                        <div class="space-y-2">
                            <label for="title" class="block text-sm font-semibold text-gray-300">
                                Judul Karya
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                class="block w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                                placeholder="Contoh: DIRT ENERGY design"
                                value="{{ old('title') }}"
                                required
                            >
                        </div>


                        <div class="space-y-2">
                            <label for="image" class="block text-sm font-semibold text-gray-300">
                                Upload Gambar
                            </label>
                            <div class="relative">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    class="block w-full px-4 py-3 text-sm text-gray-300 border border-gray-600 rounded-xl cursor-pointer bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                    accept="image/*"
                                    required
                                >
                            </div>
                            <p class="text-xs text-gray-500">Format: JPG, PNG (Max: 10MB)</p>
                        </div>
                    </div>


                    <div class="space-y-2">
                        <label for="description" class="block text-sm font-semibold text-gray-300">
                            Deskripsi Singkat
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows="3"
                            class="block w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            placeholder="Jelaskan detail karya ini..."
                            required
                        >{{ old('description') }}</textarea>
                    </div>

                    <div class="flex justify-end pt-4">
                        <button
                            type="submit"
                            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-medium rounded-xl shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/60 hover:from-red-700 hover:to-red-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
                        >
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Simpan Featured Work
                        </button>
                    </div>
                </form>
            </div>
        </div>


        <div class="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden relative">
            <!-- Decorative gradient overlay -->
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-red-800 rounded-full opacity-5 blur-3xl -ml-32 -mb-32"></div>

            <div class="px-6 py-5 border-b border-gray-700/50 relative z-10">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/50">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white">Daftar Featured Works</h3>
                        <p class="text-sm text-gray-400">Total: {{ $works->count() }} item</p>
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto relative z-10">
                <table class="min-w-full divide-y divide-gray-700/50">
                    <thead class="bg-gray-900/50">
                        <tr>
                            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Preview</th>
                            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Info Karya</th>
                            <th scope="col" class="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-800/30 divide-y divide-gray-700/30">
                        @forelse ($works as $item)
                            <tr class="hover:bg-gray-700/30 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap w-24">
                                    <div class="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-700 shadow-md ring-1 ring-gray-600/50 group">
                                        <img
                                            src="{{ asset('storage/' . $item->image) }}"
                                            alt="{{ $item->title }}"
                                            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        >
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-base font-bold text-white">{{ $item->title }}</div>
                                    <p class="text-sm text-gray-400 mt-1 line-clamp-2 max-w-md">{{ $item->description }}</p>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <div class="flex items-center justify-center space-x-3">
                                        <form
                                            action="{{ route('admin.featured-works.destroy', $item->id) }}"
                                            method="POST"
                                            onsubmit="return confirm('Hapus item ini dari Featured Works?');"
                                            class="inline"
                                        >
                                            @csrf
                                            @method('DELETE')
                                            <button
                                                type="submit"
                                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                                title="Hapus"
                                            >
                                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                </svg>
                                                Hapus
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="3" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4 ring-1 ring-gray-600/50">
                                            <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                        <p class="text-sm font-medium text-gray-300 mb-1">Belum ada Featured Works</p>
                                        <p class="text-sm text-gray-500">Upload karya terbaik Anda sekarang</p>
                                    </div>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
