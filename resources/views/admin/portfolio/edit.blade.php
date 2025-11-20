@extends('layouts.admin')

@section('content')
    <div class="space-y-6">
       
        @if ($errors->any())
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Opps! Terjadi kesalahan.</strong>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif


        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Item Portfolio</h3>

                <form action="{{ route('admin.portfolio.update', $portfolioItem->id) }}" method="POST" enctype="multipart/form-data" class="space-y-4">
                    @csrf
                    @method('PUT')

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
                            <input type="text" name="title" id="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value="{{ old('title', $portfolioItem->title) }}" required>
                        </div>


                        <div>
                            <label for="category" class="block text-sm font-medium text-gray-700">Kategori</label>
                            <select name="category" id="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                                <option value="ILLUSTRATIONS" @if(old('category', $portfolioItem->category) == 'ILLUSTRATIONS') selected @endif>ILLUSTRATIONS</option>
                                <option value="OTOMOTIF" @if(old('category', $portfolioItem->category) == 'OTOMOTIF') selected @endif>OTOMOTIF</option>
                                <option value="BLUE COLLAR" @if(old('category', $portfolioItem->category) == 'BLUE COLLAR') selected @endif>BLUE COLLAR</option>
                            </select>
                        </div>

                        {{-- Gambar --}}
                        <div>
                            <label for="image" class="block text-sm font-medium text-gray-700">Ganti Gambar (Opsional)</label>
                            <input type="file" name="image" id="image" class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none">
                        </div>
                    </div>

                    {{-- Tampilkan Gambar Saat Ini --}}
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700">Gambar Saat Ini</label>
                        <img src="{{ asset('storage/' . $portfolioItem->image) }}" alt="{{ $portfolioItem->title }}" class="mt-2 h-20 w-20 rounded-md object-cover">
                    </div>

                    <div class="flex items-center space-x-4">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Simpan Perubahan
                        </button>
                        <a href="{{ route('admin.portfolio.index') }}" class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

