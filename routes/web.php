<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (\Illuminate\Http\Request $request) {
    // Homepage shows featured products with pagination
    $perPage = $request->input('per_page', 12);
    $perPage = min(max((int) $perPage, 1), 50); // Limit between 1 and 50

    $products = \App\Models\Product::with(['category', 'images'])
        ->where('status', 'active')
        ->latest()
        ->paginate($perPage)
        ->withQueryString();

    return Inertia::render('home', [
        'products' => $products,
    ]);
})->name('home');

// Products routes
Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');

// Categories routes
Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index'])->name('categories.index');

// Shop route (filter page)
Route::get('/shop', [\App\Http\Controllers\ProductController::class, 'index'])->name('shop.index');

// Cart route (public - uses localStorage)
Route::get('/cart', function () {
    return \Inertia\Inertia::render('cart/index');
})->name('cart.index');

// Checkout routes
Route::middleware('auth')->group(function () {
    Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');
});

// Payment routes
Route::middleware('auth')->group(function () {
    Route::post('/payment/redirect', [\App\Http\Controllers\PaymentController::class, 'redirectToGateway'])->name('payment.redirect');
    Route::get('/payment/callback', [\App\Http\Controllers\PaymentController::class, 'handleGatewayCallback'])->name('payment.callback');
});

// Payment webhook (no auth, IP restricted)
Route::post('/payment/webhook', [\App\Http\Controllers\PaymentController::class, 'handleWebhook'])
    ->middleware(\App\Http\Middleware\RestrictIPMiddleware::class)
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])
    ->name('paystack.webhook');

// Customer Account routes
Route::middleware(['auth', 'verified'])->prefix('account')->name('account.')->group(function () {
    Route::get('/', function () {
        return redirect()->route('account.orders.index');
    });

    // Orders
    Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [\App\Http\Controllers\OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{id}/verify-payment', [\App\Http\Controllers\OrderController::class, 'verifyPayment'])->name('orders.verify-payment');

    // Payments (view only)
    Route::get('/payments', function (\Illuminate\Http\Request $request) {
        $perPage = $request->input('per_page', 10);
        $perPage = min(max((int) $perPage, 1), 50); // Limit between 1 and 50

        $payments = \Illuminate\Support\Facades\Auth::user()
            ->payments()
            ->with(['order'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return \Inertia\Inertia::render('account/payments/index', [
            'payments' => $payments,
        ]);
    })->name('payments.index');
    Route::get('/payments/{id}', function ($id) {
        $payment = \Illuminate\Support\Facades\Auth::user()->payments()->with(['order.orderItems.product.images'])->findOrFail($id);
        return \Inertia\Inertia::render('account/payments/show', ['payment' => $payment]);
    })->name('payments.show');

    // Addresses
    Route::get('/addresses', [\App\Http\Controllers\AddressController::class, 'index'])->name('addresses.index');
    Route::post('/addresses', [\App\Http\Controllers\AddressController::class, 'store'])->name('addresses.store');
    Route::put('/addresses/{id}', [\App\Http\Controllers\AddressController::class, 'update'])->name('addresses.update');
    Route::delete('/addresses/{id}', [\App\Http\Controllers\AddressController::class, 'destroy'])->name('addresses.destroy');
    Route::post('/addresses/{id}/set-default', [\App\Http\Controllers\AddressController::class, 'setDefault'])->name('addresses.set-default');

    // Profile
    Route::get('/profile', [\App\Http\Controllers\AccountProfileController::class, 'show'])->name('profile');
    Route::put('/profile', [\App\Http\Controllers\AccountProfileController::class, 'update'])->name('profile.update');
});

// Regions API routes (for frontend dropdowns)
Route::get('/regions', [\App\Http\Controllers\AddressController::class, 'getRegions'])->name('regions.index');

// Static pages
Route::get('/about', function () {
    return \Inertia\Inertia::render('about');
})->name('about');

Route::get('/contact', [\App\Http\Controllers\ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

Route::get('/faq', function () {
    return \Inertia\Inertia::render('faq');
})->name('faq');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('account.orders.index');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
