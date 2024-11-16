<?php

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BorrowingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PenaltySettingController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->middleware(['role:admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('admin.dashboard');
    Route::resource('categories', CategoryController::class, ['as' => 'admin']);
    Route::resource('publishers', PublisherController::class, ['as' => 'admin']);
    Route::resource('books', BookController::class, ['as' => 'admin']);

    Route::resource('penalty-settings', PenaltySettingController::class, ['as' => 'admin'])->only(['index', 'update']);

    Route::resource('borrowings', BorrowingController::class, ['as' => 'admin']);
});


require __DIR__ . '/auth.php';
