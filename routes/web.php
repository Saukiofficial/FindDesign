<?php

use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\FeaturedWorkController;
use App\Http\Controllers\Admin\HeroSettingController;
use App\Http\Controllers\Admin\AboutSettingController;
use App\Http\Controllers\ProfileController;

use App\Models\PortfolioItem;
use App\Models\FeaturedWork;
use App\Models\HeroSetting;
use App\Models\AboutSetting;
use App\Models\Visitor;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| File ini mengatur semua route website FindDesign.
|
*/

Route::get('/', function (Request $request) {
    try {
        Visitor::firstOrCreate([
            'ip_address' => $request->ip(),
            'visit_date' => now()->toDateString(),
        ]);
    } catch (\Exception $e) {
        // Abaikan error visitor agar website tetap jalan
    }

    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,

        /*
        |--------------------------------------------------------------------------
        | Hero Section Setting
        |--------------------------------------------------------------------------
        |
        | Data ini digunakan untuk mengontrol Hero.jsx dari admin Blade.
        |
        */
        'heroSetting' => HeroSetting::where('is_active', true)->first(),

        /*
        |--------------------------------------------------------------------------
        | About Section Setting
        |--------------------------------------------------------------------------
        |
        | Data ini digunakan untuk mengontrol About.jsx dari admin Blade.
        |
        */
        'aboutSetting' => AboutSetting::where('is_active', true)->first(),

        /*
        |--------------------------------------------------------------------------
        | Portfolio Items
        |--------------------------------------------------------------------------
        |
        | Data portfolio yang ditampilkan di halaman frontend.
        |
        */
        'portfolioItems' => PortfolioItem::latest()->get(),

        /*
        |--------------------------------------------------------------------------
        | Featured Works
        |--------------------------------------------------------------------------
        |
        | Data featured works untuk About.jsx.
        |
        */
        'featuredWorks' => FeaturedWork::latest()->get()->map(function ($item) {
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
        // Abaikan error visitor count agar dashboard tetap jalan
    }

    return view('dashboard', compact(
        'portfolioCount',
        'featuredCount',
        'visitorCount'
    ));
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Manajemen Hero Section
        |--------------------------------------------------------------------------
        */
        Route::get('hero-settings', [HeroSettingController::class, 'edit'])
            ->name('hero-settings.edit');

        Route::put('hero-settings', [HeroSettingController::class, 'update'])
            ->name('hero-settings.update');

        /*
        |--------------------------------------------------------------------------
        | Manajemen About Section
        |--------------------------------------------------------------------------
        */
        Route::get('about-settings', [AboutSettingController::class, 'edit'])
            ->name('about-settings.edit');

        Route::put('about-settings', [AboutSettingController::class, 'update'])
            ->name('about-settings.update');

        /*
        |--------------------------------------------------------------------------
        | Manajemen Portfolio
        |--------------------------------------------------------------------------
        */
        Route::resource('portfolio', PortfolioController::class);

        /*
        |--------------------------------------------------------------------------
        | Manajemen Featured Works
        |--------------------------------------------------------------------------
        */
        Route::resource('featured-works', FeaturedWorkController::class);
    });

require __DIR__ . '/auth.php';