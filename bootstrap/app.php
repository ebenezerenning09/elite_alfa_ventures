<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'superadmin' => \App\Http\Middleware\EnsureSuperAdmin::class,
            'guest.admin' => \App\Http\Middleware\RedirectIfAdminAuthenticated::class,
        ]);

        // Configure redirects for authenticated users trying to access guest routes
        $middleware->redirectUsersTo(function (Request $request) {
            // If accessing admin login while authenticated as admin, redirect to admin dashboard
            if ($request->is('admin/login') || $request->is('admin/login/*')) {
                if ($request->user('admin')) {
                    return route('admin.dashboard');
                }
                // Don't redirect if not authenticated as admin - allow access to login page
                return null;
            }
            // If accessing regular login while authenticated as user, redirect to user dashboard
            if ($request->is('login') && $request->user()) {
                return route('dashboard');
            }
            return null;
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
