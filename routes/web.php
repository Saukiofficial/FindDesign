<?php

use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\FeaturedWorkController;
use App\Http\Controllers\ProfileController;
// PENTING: Import Model agar bisa mengambil data dari database
use App\Models\PortfolioItem;
use App\Models\FeaturedWork;
use App\Models\Visitor; // Tambahan: Model Visitor untuk tracking
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request; // Tambahan: Request untuk ambil IP

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| File ini mengatur semua rute untuk aplikasi Anda.
|
*/


Route::get('/', function (Request $request) {


    try {
        Visitor::firstOrCreate([
            'ip_address' => $request->ip(),
            'visit_date' => now()->toDateString(),
        ]);
    } catch (\Exception $e) {

    }


    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,


        'portfolioItems' => PortfolioItem::all(),


        'featuredWorks' => FeaturedWork::latest()->get()->map(function($item) {
             return [
                'id' => $item->id,
                'title' => $item->title,
                'desc' => $item->description,

                'src' => asset('storage/' . $item->image),
            ];
        }),
    ]);
});


Route::get('/dashboard', function () {

    $portfolioCount = PortfolioItem::count();
    $featuredCount = FeaturedWork::count();


    $visitorCount = 0;
    try {
        $visitorCount = Visitor::count();
    } catch (\Exception $e) {

    }


    return view('dashboard', compact('portfolioCount', 'featuredCount', 'visitorCount'));

})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Manajemen Portfolio
    Route::resource('portfolio', PortfolioController::class);

    // Manajemen Featured Works
    Route::resource('featured-works', FeaturedWorkController::class);
});

require __DIR__.'/auth.php';
