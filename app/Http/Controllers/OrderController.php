<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Services\PaystackService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected PaystackService $paystackService;

    public function __construct(PaystackService $paystackService)
    {
        $this->paystackService = $paystackService;
    }
    public function index(Request $request)
    {
        $query = Auth::user()->orders()->with(['orderItems.product.images', 'payment']);

        // Filter by status if provided
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Get pagination parameters
        $perPage = $request->input('per_page', 10);
        $perPage = min(max((int) $perPage, 1), 50); // Limit between 1 and 50

        $orders = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('account/orders/index', [
            'orders' => $orders,
            'filters' => $request->only('status'),
        ]);
    }

    public function show($id)
    {
        $order = Auth::user()->orders()
            ->with(['orderItems.product.images', 'payment'])
            ->findOrFail($id);

        return Inertia::render('account/orders/show', [
            'order' => $order,
        ]);
    }

    public function verifyPayment($id)
    {
        try {
            $order = Auth::user()->orders()->with('payment')->findOrFail($id);

            // Check if order has pending payment
            if ($order->status !== 'pending') {
                return back()->with('error', 'This order is not pending payment verification.');
            }

            // Check if payment exists
            if (!$order->payment) {
                return back()->with('error', 'Payment record not found for this order.');
            }

            $payment = $order->payment;

            // Check if payment is already processed
            if ($payment->processed_at !== null) {
                return back()->with('warning', 'This payment has already been processed.');
            }

            // Verify payment with Paystack
            $paymentDetails = $this->paystackService->verifyTransaction($payment->payment_reference);

            // Check if verification was successful
            if (!isset($paymentDetails['status']) || $paymentDetails['status'] !== true) {
                return back()->with('error', 'Payment verification failed. Please try again later.');
            }

            $transactionData = $paymentDetails['data'] ?? [];
            $transactionId = $transactionData['id'] ?? null;
            $status = $transactionData['status'] ?? null;

            // Process the payment
            $result = $this->processPayment($payment->payment_reference, $transactionId, $status);

            if ($result === null) {
                return back()->with('error', 'Payment record not found.');
            }

            if ($result['status'] === 'completed') {
                return back()->with('success', 'Payment verified successfully! Your order is now being processed.');
            } else {
                return back()->with('error', 'Payment verification failed. The transaction was not successful.');
            }
        } catch (Exception $e) {
            Log::error('Manual payment verification error', [
                'order_id' => $id,
                'error' => $e->getMessage(),
                'exception' => $e,
            ]);

            return back()->with('error', 'An error occurred during payment verification. Please try again later.');
        }
    }

    /**
     * Process payment verification (similar to PaymentController)
     */
    protected function processPayment(string $reference, ?string $transactionId = null, ?string $status = null): ?array
    {
        return DB::transaction(function () use ($reference, $transactionId, $status) {
            // Lock payment record for update to prevent duplicate processing
            $payment = Payment::where('payment_reference', $reference)
                ->lockForUpdate()
                ->first();

            if (!$payment) {
                Log::warning('Payment record not found', ['reference' => $reference]);
                return null;
            }

            // Check if already processed (idempotency)
            if ($payment->processed_at !== null) {
                Log::info('Payment already processed', ['reference' => $reference]);
                return [
                    'status' => $payment->status,
                    'order_id' => $payment->order_id,
                ];
            }

            // Determine payment status from Paystack response
            // Paystack returns 'success' for successful transactions
            $paymentStatus = ($status === 'success') ? 'completed' : 'failed';

            // Mark payment as processed
            $payment->update([
                'transaction_id' => $transactionId ?? $payment->transaction_id,
                'processed_at' => now(),
                'status' => $paymentStatus,
                'payment_date' => now(),
            ]);

            // Update order status based on payment status
            if ($paymentStatus === 'completed') {
                $payment->order->update([
                    'status' => 'processing',
                ]);
            } else {
                $payment->order->update([
                    'status' => 'cancelled',
                ]);
            }

            return [
                'status' => $paymentStatus,
                'order_id' => $payment->order_id,
            ];
        });
    }
}
