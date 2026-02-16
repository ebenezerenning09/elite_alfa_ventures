<?php

use App\Http\Controllers\Admin\Auth\AdminAuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest.admin')->group(function () {
        Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AdminAuthenticatedSessionController::class, 'store']);
    });

    Route::middleware(['auth:admin', 'superadmin'])->group(function () {
        Route::post('logout', [AdminAuthenticatedSessionController::class, 'destroy'])
            ->name('logout');

        // Dashboard
        Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
            ->name('dashboard');

        // Products
        Route::resource('products', \App\Http\Controllers\Admin\Products\ProductController::class);

        // Orders
        Route::resource('orders', \App\Http\Controllers\Admin\Orders\OrderController::class)->parameters(['orders' => 'order']);
        Route::post('orders/{order}/update-status', [\App\Http\Controllers\Admin\Orders\OrderController::class, 'updateStatus'])
            ->name('orders.update-status');

        // Payments
        Route::get('payments', [\App\Http\Controllers\Admin\Payments\PaymentController::class, 'index'])
            ->name('payments.index');
        Route::get('payments/{payment}', [\App\Http\Controllers\Admin\Payments\PaymentController::class, 'show'])
            ->name('payments.show');

        // Users
        Route::resource('users', \App\Http\Controllers\Admin\Users\UserController::class)->parameters(['users' => 'user']);
        Route::post('users/{user}/toggle-active', [\App\Http\Controllers\Admin\Users\UserController::class, 'toggleActive'])
            ->name('users.toggle-active');
    });
});
