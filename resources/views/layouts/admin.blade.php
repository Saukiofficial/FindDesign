<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('page-title', 'Admin Dashboard') - {{ config('app.name', 'FindDesign') }}</title>

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&display=swap" rel="stylesheet" />

    {{-- Vite --}}
    {{-- Untuk admin Blade cukup load app.css supaya Tailwind aktif --}}
    @vite(['resources/css/app.css'])

    <style>
        body {
            font-family: 'Inter', sans-serif;
        }

        .bg-dark-red-gradient {
            background: linear-gradient(135deg, #450a0a 0%, #7f1d1d 45%, #991b1b 100%);
        }

        .menu-active {
            background: linear-gradient(90deg, rgba(220, 38, 38, 0.28) 0%, rgba(185, 28, 28, 0.35) 100%);
            border-left: 4px solid #ef4444;
            color: #ffffff;
        }

        .menu-hover {
            border-left: 4px solid transparent;
        }

        .menu-hover:hover {
            background: rgba(220, 38, 38, 0.12);
            border-left-color: rgba(248, 113, 113, 0.5);
        }

        .glass-effect {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.10);
        }

        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #111827;
        }

        ::-webkit-scrollbar-thumb {
            background: #dc2626;
            border-radius: 999px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #b91c1c;
        }
    </style>
</head>

<body class="antialiased bg-gray-900 text-gray-100">
    <div class="min-h-screen flex">

        {{-- Sidebar Desktop --}}
        <aside class="w-72 bg-dark-red-gradient shadow-2xl hidden md:flex md:flex-col shrink-0 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full opacity-10 blur-3xl -mr-32 -mt-32"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-red-800 rounded-full opacity-10 blur-3xl -ml-32 -mb-32"></div>

            <div class="flex flex-col h-full relative z-10">

                {{-- Logo --}}
                <div class="px-6 py-8">
                    <a href="{{ route('dashboard') }}" class="flex items-center space-x-3">
                        <img
                            src="{{ asset('images/logo-2.webp') }}"
                            alt="FindDesign Logo"
                            class="w-12 h-12 object-contain"
                            onerror="this.style.display='none'"
                        >

                        <div>
                            <h1 class="text-2xl font-extrabold text-white drop-shadow-lg">
                                FindDesign
                            </h1>
                            <p class="text-xs tracking-[0.25em] uppercase text-red-200/70">
                                Admin Panel
                            </p>
                        </div>
                    </a>
                </div>

                {{-- Navigation --}}
                <nav class="flex-1 px-4 space-y-2 mt-4">

                    {{-- Dashboard --}}
                    <a
                        href="{{ route('dashboard') }}"
                        class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('dashboard') ? 'menu-active shadow-lg' : 'text-gray-300 menu-hover' }}"
                    >
                        <svg class="w-5 h-5 mr-3 {{ request()->routeIs('dashboard') ? 'text-red-300' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span class="font-medium">Dashboard</span>
                    </a>

                    {{-- Hero Section --}}
                    <a
                        href="{{ route('admin.hero-settings.edit') }}"
                        class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.hero-settings.*') ? 'menu-active shadow-lg' : 'text-gray-300 menu-hover' }}"
                    >
                        <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.hero-settings.*') ? 'text-red-300' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h5a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm11 0a2 2 0 012-2h1a2 2 0 012 2v4a2 2 0 01-2 2h-1a2 2 0 01-2-2v-4z"/>
                        </svg>
                        <span class="font-medium">Hero Section</span>
                    </a>

                    {{-- About Section --}}
                    <a
                        href="{{ route('admin.about-settings.edit') }}"
                        class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.about-settings.*') ? 'menu-active shadow-lg' : 'text-gray-300 menu-hover' }}"
                    >
                        <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.about-settings.*') ? 'text-red-300' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.343 17.657A8.97 8.97 0 0112 15c2.21 0 4.234.8 5.657 2.127"/>
                        </svg>
                        <span class="font-medium">About Section</span>
                    </a>

                    {{-- Our Services Section --}}
                    <a
                        href="{{ route('admin.service-settings.edit') }}"
                        class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.service-settings.*') ? 'menu-active shadow-lg' : 'text-gray-300 menu-hover' }}"
                    >
                        <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.service-settings.*') ? 'text-red-300' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10"/>
                        </svg>
                        <span class="font-medium">Our Services</span>
                    </a>

                    {{-- Portfolio --}}
                    <a
                        href="{{ route('admin.portfolio.index') }}"
                        class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.portfolio.*') ? 'menu-active shadow-lg' : 'text-gray-300 menu-hover' }}"
                    >
                        <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.portfolio.*') ? 'text-red-300' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        <span class="font-medium">Portfolio</span>
                    </a>

                    {{-- Featured Works --}}
                    <a
                        href="{{ route('admin.featured-works.index') }}"
                        class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 {{ request()->routeIs('admin.featured-works.*') ? 'menu-active shadow-lg' : 'text-gray-300 menu-hover' }}"
                    >
                        <svg class="w-5 h-5 mr-3 {{ request()->routeIs('admin.featured-works.*') ? 'text-red-300' : 'text-gray-400 group-hover:text-red-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                        <span class="font-medium">Featured Works</span>
                    </a>
                </nav>

                {{-- User Profile --}}
                <div class="p-4 border-t border-red-800/30">
                    <div class="flex items-center px-4 py-3 rounded-xl glass-effect">
                        <div class="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {{ substr(Auth::user()->name ?? 'A', 0, 1) }}
                        </div>

                        <div class="ml-3 flex-1 min-w-0">
                            <p class="text-sm font-semibold text-white truncate">
                                {{ Auth::user()->name ?? 'Admin' }}
                            </p>
                            <p class="text-xs text-gray-300 truncate">
                                {{ Auth::user()->email ?? 'admin@example.com' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        {{-- Main Area --}}
        <div class="flex-1 flex flex-col bg-gray-900 min-w-0">

            {{-- Topbar --}}
            <header class="bg-gray-800 shadow-xl sticky top-0 z-20 border-b border-gray-700/50">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div>
                            <h2 class="text-lg font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                @yield('page-title', 'Dashboard')
                            </h2>
                        </div>

                        <div class="flex items-center space-x-3">
                            <a
                                href="{{ url('/') }}"
                                target="_blank"
                                class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 hover:bg-red-600/20 border border-gray-600/50 hover:border-red-500/50 rounded-xl transition-all duration-300"
                            >
                                Lihat Website
                            </a>

                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button
                                    type="submit"
                                    class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 hover:bg-red-600/20 border border-gray-600/50 hover:border-red-500/50 rounded-xl transition-all duration-300"
                                >
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

            {{-- Mobile Menu --}}
            <div class="md:hidden bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div class="grid grid-cols-2 gap-2">
                    <a
                        href="{{ route('dashboard') }}"
                        class="rounded-lg px-3 py-2 text-sm {{ request()->routeIs('dashboard') ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                    >
                        Dashboard
                    </a>

                    <a
                        href="{{ route('admin.hero-settings.edit') }}"
                        class="rounded-lg px-3 py-2 text-sm {{ request()->routeIs('admin.hero-settings.*') ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                    >
                        Hero
                    </a>

                    <a
                        href="{{ route('admin.about-settings.edit') }}"
                        class="rounded-lg px-3 py-2 text-sm {{ request()->routeIs('admin.about-settings.*') ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                    >
                        About
                    </a>

                    <a
                        href="{{ route('admin.service-settings.edit') }}"
                        class="rounded-lg px-3 py-2 text-sm {{ request()->routeIs('admin.service-settings.*') ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                    >
                        Services
                    </a>

                    <a
                        href="{{ route('admin.portfolio.index') }}"
                        class="rounded-lg px-3 py-2 text-sm {{ request()->routeIs('admin.portfolio.*') ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                    >
                        Portfolio
                    </a>

                    <a
                        href="{{ route('admin.featured-works.index') }}"
                        class="rounded-lg px-3 py-2 text-sm {{ request()->routeIs('admin.featured-works.*') ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                    >
                        Featured
                    </a>
                </div>
            </div>

            {{-- Content --}}
            <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-900">
                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>