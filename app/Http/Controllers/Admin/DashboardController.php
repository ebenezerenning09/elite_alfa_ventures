<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Default to current month if no dates provided
        $startDate = $request->input('start_date', now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->endOfMonth()->format('Y-m-d'));

        // Overall statistics
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalPayments = Payment::count();
        $totalUsers = User::count();

        // Financial statistics for date range
        $completedPayments = Payment::where('status', 'completed')
            ->whereBetween('payment_date', [$startDate, $endDate]);

        $totalRevenue = $completedPayments->sum('amount');
        $paymentsCount = $completedPayments->count();
        $averageOrderValue = $paymentsCount > 0 ? $totalRevenue / $paymentsCount : 0;

        // Additional financial stats
        $successfulPayments = Payment::where('status', 'completed')
            ->whereBetween('payment_date', [$startDate, $endDate])
            ->count();

        $failedPayments = Payment::where('status', 'failed')
            ->whereBetween('payment_date', [$startDate, $endDate])
            ->count();

        // Recent orders
        $recentOrders = Order::with(['user', 'payment'])
            ->latest()
            ->limit(10)
            ->get();

        // Recent payments
        $recentPayments = Payment::with(['user', 'order'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('admin/dashboard/index', [
            'stats' => [
                'total_products' => $totalProducts,
                'total_orders' => $totalOrders,
                'total_payments' => $totalPayments,
                'total_users' => $totalUsers,
            ],
            'financials' => [
                'total_revenue' => (float) $totalRevenue,
                'payments_count' => $paymentsCount,
                'average_order_value' => (float) $averageOrderValue,
                'successful_payments' => $successfulPayments,
                'failed_payments' => $failedPayments,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'recent_orders' => $recentOrders,
            'recent_payments' => $recentPayments,
        ]);
    }
}
