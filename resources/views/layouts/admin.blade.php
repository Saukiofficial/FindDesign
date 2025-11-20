<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/js/admin.js'])

        <style>
            body {
                font-family: 'Inter', sans-serif;
            }

            /* Custom Gradient Background */
            .bg-dark-red-gradient {
                background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%);
            }

            .bg-dark-red-soft {
                background: linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%);
            }

            /* Active Menu Gradient */
            .menu-active {
                background: linear-gradient(90deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.3) 100%);
                border-left: 4px solid #dc2626;
            }

            /* Hover Effect */
            .menu-hover:hover {
                background: rgba(220, 38, 38, 0.1);
                border-left: 4px solid transparent;
                transition: all 0.3s ease;
            }

            /* Glass Effect */
            .glass-effect {
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            /* Custom Scrollbar */
            ::-webkit-scrollbar {
                width: 8px;
            }

            ::-webkit-scrollbar-track {
                background: #1a1a1a;
            }

            ::-webkit-scrollbar-thumb {
                background: #dc2626;
                border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: #b91c1c;
            }
        </style>
    </head>
    <body class="antialiased bg-gray-900">
        <div class="min-h-screen flex">
            <!-- Sidebar -->
            <aside class="w-72 bg-dark-red-gradient shadow-2xl hidden md:flex md:flex-col shrink-0 relative overflow-hidden">
                <!-- Decorative Elements -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full opacity-10 blur-3xl -mr-32 -mt-32"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-red-800 rounded-full opacity-10 blur-3xl -ml-32 -mb-32"></div>

                <div class="flex flex-col h-full relative z-10">
                    <!-- Logo -->
                    <div class="px-6 py-8">
                        <a href="{{ route('dashboard') }}" class="flex items-center space-x-3">
                            <img src="{{ asset('images/logo.png') }}" alt="FindDesign Logo" class="w-12 h-12 object-contain transform hover:scale-105 transition-transform">
                            <h1 class="text-2xl font-bold text-white drop-shadow-lg">FindDesign</h1>
                        </a>
                    </div>

                    <!-- Navigation -->
                    <nav class="flex-1 px-4 space-y-2 mt-4">
                        {{-- Menu Dashboard --}}
                        <a href="{{ route('dashboard') }}" class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('dashboard') ? 'menu-active text-white shadow-lg' : 'text-gray-300 menu-hover' }}">
                            <svg class="w-5 h-5 mr-3 {{ request()->routeIs('dashboard') ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                            <span class="font-medium">Dashboard</span>
                        </a>

                        {{-- Menu Portfolio --}}
                        <a href="{{ route('admin.portfolio.index') }}" class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.portfolio.*') ? 'menu-active text-white shadow-lg' : 'text-gray-300 menu-hover' }}">
                            <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.portfolio.*') ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                            </svg>
                            <span class="font-medium">Portfolio</span>
                        </a>

                        {{-- Menu Featured Works --}}
                        <a href="{{ route('admin.featured-works.index') }}" class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.featured-works.*') ? 'menu-active text-white shadow-lg' : 'text-gray-300 menu-hover' }}">
                            <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.featured-works.*') ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                            <span class="font-medium">Featured Works</span>
                        </a>
                    </nav>

                    <!-- User Profile Section -->
                    <div class="p-4 border-t border-red-800/30">
                        <div class="flex items-center px-4 py-3 rounded-xl glass-effect backdrop-blur-sm">
                            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {{ substr(Auth::user()->name ?? 'A', 0, 1) }}
                            </div>
                            <div class="ml-3 flex-1">
                                <p class="text-sm font-semibold text-white">{{ Auth::user()->name ?? 'Admin' }}</p>
                                <p class="text-xs text-gray-400">{{ Auth::user()->email ?? 'admin@example.com' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Main Content Area -->
            <div class="flex-1 flex flex-col bg-gray-900">
                <!-- Topbar -->
                <header class="bg-gray-800 shadow-xl sticky top-0 z-10 border-b border-gray-700/50">
                    <div class="px-6 lg:px-8">
                        <div class="flex justify-between items-center h-16">
                            <!-- Page Title -->
                            <div>
                                <h2 class="text-lg font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                    @yield('page-title', 'Dashboard')
                                </h2>
                            </div>

                            <!-- Right Side Actions -->
                            <div class="flex items-center space-x-3">
                                <!-- Notifications Icon -->
                                <button class="p-2.5 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-xl transition-all duration-300 relative">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                    </svg>
                                    <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                <!-- Logout -->
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 hover:bg-red-600/20 border border-gray-600/50 hover:border-red-500/50 rounded-xl transition-all duration-300">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                        </svg>
                                        <span>Logout</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="flex-1 p-6 lg:p-8 overflow-y-auto bg-gray-900">
                    @yield('content')
                </main>
            </div>
        </div>
    </body>
</html>
