<?php

namespace App\Http\Controllers\Admin\Payments;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['user', 'order']);

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by payment method
        if ($request->has('payment_method') && $request->payment_method) {
            $query->where('payment_method', $request->payment_method);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('payment_date', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('payment_date', '<=', $request->end_date);
        }

        // Search by transaction ID, reference, or user email/name
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                    ->orWhere('payment_reference', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('email', 'like', "%{$search}%")
                            ->orWhere('name', 'like', "%{$search}%");
                    });
            });
        }

        $perPage = $request->input('per_page', 30);
        $perPage = min(max((int) $perPage, 1), 50);

        $payments = $query->latest('payment_date')->paginate($perPage)->withQueryString();

        // Financial summary
        $totalRevenue = Payment::where('status', 'completed')->sum('amount');
        $successfulPayments = Payment::where('status', 'completed')->count();
        $failedPayments = Payment::where('status', 'failed')->count();

        return Inertia::render('admin/payments/index', [
            'payments' => $payments,
            'filters' => $request->only('status', 'payment_method', 'start_date', 'end_date', 'search'),
            'summary' => [
                'total_revenue' => (float) $totalRevenue,
                'successful_payments' => $successfulPayments,
                'failed_payments' => $failedPayments,
            ],
        ]);
    }

    public function show($id)
    {
        $payment = Payment::with([
            'user',
            'order.orderItems.product.images',
            'order',
        ])
            ->findOrFail($id);

        return Inertia::render('admin/payments/show', [
            'payment' => $payment,
        ]);
    }
}
