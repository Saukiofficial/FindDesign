<?php

use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Models\PortfolioItem;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Rute untuk Halaman Landing (Publik - Tetap menggunakan Inertia/React)
Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'portfolioItems' => PortfolioItem::all(),
    ]);
});

// PERUBAHAN: Rute Dasbor sekarang menggunakan Blade
Route::get('/dashboard', function () {
    return view('dashboard'); // Mengarahkan ke file dashboard.blade.php
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute-rute yang memerlukan autentikasi
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Grup Rute untuk Area Admin (Sudah menggunakan Blade)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('portfolio', PortfolioController::class);
});


require __DIR__.'/auth.php';

