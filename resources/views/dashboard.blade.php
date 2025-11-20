@extends('layouts.admin')

@section('page-title', 'Dashboard Overview')

@section('content')
<div class="space-y-8 p-6 lg:p-8 w-full">

    <div class="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-950 rounded-3xl p-8 sm:p-10 shadow-2xl text-white border border-red-700/30">
        <div class="relative z-10">
            <h2 class="text-3xl font-bold mb-2">Selamat Datang, {{ Auth::user()->name }}! 👋</h2>
            <p class="text-red-100 text-lg max-w-2xl">
                Ini adalah pusat kontrol website Anda. Kelola portfolio, karya unggulan, dan pantau perkembangan konten Anda dari sini.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">

                <a href="{{ route('admin.portfolio.create') }}" class="inline-flex items-center px-5 py-2.5 bg-white text-red-600 font-semibold rounded-xl shadow-lg hover:bg-red-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Upload Portfolio
                </a>

                <a href="{{ url('/') }}" target="_blank" class="inline-flex items-center px-5 py-2.5 bg-red-500/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-red-500/30 hover:border-white/50 transition-all duration-300">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Lihat Website
                </a>
            </div>
        </div>


        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>


        <div class="absolute top-1/2 right-10 w-32 h-32 border-2 border-red-500/20 rounded-full"></div>
        <div class="absolute bottom-10 right-1/4 w-16 h-16 border-2 border-red-400/20 rounded-lg rotate-45"></div>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-red-600/50 transition-all duration-300 transform hover:scale-105">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-900/50">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <span class="text-xs font-medium px-2.5 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">+Aktif</span>
            </div>
            <h3 class="text-2xl font-bold text-white">{{ $portfolioCount }}</h3>
            <p class="text-sm text-gray-400">Total Item Portfolio</p>
        </div>


        <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-red-600/50 transition-all duration-300 transform hover:scale-105">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-900/50">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                </div>
                <span class="text-xs font-medium px-2.5 py-1 bg-pink-500/20 text-pink-400 rounded-full border border-pink-500/30">Unggulan</span>
            </div>
            <h3 class="text-2xl font-bold text-white">{{ $featuredCount }}</h3>
            <p class="text-sm text-gray-400">Featured Works</p>
        </div>


        <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-red-600/50 transition-all duration-300 transform hover:scale-105">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                </div>
                <span class="text-xs font-medium px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">All Time</span>
            </div>

            <h3 class="text-2xl font-bold text-white">{{ number_format($visitorCount ?? 0) }}</h3>
            <p class="text-sm text-gray-400">Total Pengunjung</p>
        </div>

        {{-- Card 4: Proyek Selesai --}}
        <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-red-600/50 transition-all duration-300 transform hover:scale-105">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-900/50">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
            </div>
            <h3 class="text-2xl font-bold text-white">500+</h3>
            <p class="text-sm text-gray-400">Proyek Selesai</p>
        </div>
    </div>

    {{-- Quick Shortcuts Section --}}
    <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-700/50 bg-gradient-to-r from-red-900/20 to-transparent">
            <h3 class="text-lg font-bold text-white">Aksi Cepat</h3>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="{{ route('admin.portfolio.index') }}" class="flex items-center p-4 rounded-xl border border-gray-700/50 hover:border-red-600 hover:bg-red-900/20 transition-all duration-300 group transform hover:scale-105">
                <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-red-900/50 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <h4 class="font-semibold text-white">Kelola Portfolio</h4>
                    <p class="text-sm text-gray-400">Lihat dan edit daftar portfolio</p>
                </div>
                <svg class="w-5 h-5 text-gray-500 ml-auto group-hover:text-red-400 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </a>

            <a href="{{ route('admin.featured-works.index') }}" class="flex items-center p-4 rounded-xl border border-gray-700/50 hover:border-pink-600 hover:bg-pink-900/20 transition-all duration-300 group transform hover:scale-105">
                <div class="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-pink-900/50 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <h4 class="font-semibold text-white">Kelola Featured Works</h4>
                    <p class="text-sm text-gray-400">Update karya unggulan di halaman depan</p>
                </div>
                <svg class="w-5 h-5 text-gray-500 ml-auto group-hover:text-pink-400 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    </div>
</div>
@endsection
