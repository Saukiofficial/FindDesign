@extends('layouts.admin')

@section('page-title', 'Portfolio Management')

@section('content')
    <div class="space-y-6">
        {{-- Header Section --}}
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Portfolio Management</h1>
                <p class="mt-1 text-sm text-gray-500">Kelola item portfolio Anda dengan mudah</p>
            </div>
        </div>

        {{-- Alert Success --}}
        @if (session('success'))
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">{{ session('success') }}</p>
                    </div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-green-500 hover:bg-green-100" onclick="this.parentElement.parentElement.remove()">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        @endif

        {{-- Alert Error --}}
        @if ($errors->any())
            <div class="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3 flex-1">
                        <p class="text-sm font-semibold text-red-800 mb-2">Terjadi kesalahan:</p>
                        <ul class="list-disc list-inside text-sm text-red-700 space-y-1">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        {{-- Form Tambah Item --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-100">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-900">Tambah Item Baru</h3>
                        <p class="text-sm text-gray-500">Upload portfolio item baru ke galeri Anda</p>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <form action="{{ route('admin.portfolio.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {{-- Judul --}}
                        <div class="space-y-2">
                            <label for="title" class="block text-sm font-semibold text-gray-700">
                                Judul Portfolio
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="Masukkan judul portfolio"
                                value="{{ old('title') }}"
                                required
                            >
                        </div>

                        {{-- Kategori --}}
                        <div class="space-y-2">
                            <label for="category" class="block text-sm font-semibold text-gray-700">
                                Kategori
                            </label>
                            <select
                                name="category"
                                id="category"
                                class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                required
                            >
                                <option value="" disabled selected>Pilih Kategori</option>
                                <option value="ILLUSTRATIONS" @if(old('category') == 'ILLUSTRATIONS') selected @endif>ILLUSTRATIONS</option>
                                <option value="OTOMOTIF" @if(old('category') == 'OTOMOTIF') selected @endif>OTOMOTIF</option>
                                <option value="BLUE COLLAR" @if(old('category') == 'BLUE COLLAR') selected @endif>BLUE COLLAR</option>
                            </select>
                        </div>

                        {{-- Gambar --}}
                        <div class="space-y-2">
                            <label for="image" class="block text-sm font-semibold text-gray-700">
                                Upload Gambar
                            </label>
                            <div class="relative">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    class="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                    accept="image/*"
                                    required
                                >
                            </div>
                            <p class="text-xs text-gray-500">Format: JPG, PNG, atau GIF (Max: 50MB)</p>
                        </div>
                    </div>

                    <div class="flex justify-end pt-4">
                        <button
                            type="submit"
                            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Tambah Portfolio
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {{-- Tabel Daftar Item --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-100">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-semibold text-gray-900">Daftar Portfolio</h3>
                            <p class="text-sm text-gray-500">Total: {{ $portfolioItems->count() }} item</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Preview</th>
                            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
                            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                            <th scope="col" class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                        @forelse ($portfolioItems as $item)
                            <tr class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                                        <img
                                            src="{{ asset('storage/' . $item->image) }}"
                                            alt="{{ $item->title }}"
                                            class="w-full h-full object-cover"
                                        >
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-semibold text-gray-900">{{ $item->title }}</div>
                                    <div class="text-xs text-gray-500 mt-1">ID: #{{ $item->id }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200">
                                        {{ $item->category }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <div class="flex items-center justify-center space-x-3">
                                        <a
                                            href="{{ route('admin.portfolio.edit', $item->id) }}"
                                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                                            title="Edit"
                                        >
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                            Edit
                                        </a>

                                        <form
                                            action="{{ route('admin.portfolio.destroy', $item->id) }}"
                                            method="POST"
                                            onsubmit="return confirm('Apakah Anda yakin ingin menghapus item ini?');"
                                            class="inline"
                                        >
                                            @csrf
                                            @method('DELETE')
                                            <button
                                                type="submit"
                                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
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
                                <td colspan="4" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                            </svg>
                                        </div>
                                        <p class="text-sm font-medium text-gray-900 mb-1">Belum ada portfolio</p>
                                        <p class="text-sm text-gray-500">Mulai tambahkan item portfolio baru di atas</p>
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
