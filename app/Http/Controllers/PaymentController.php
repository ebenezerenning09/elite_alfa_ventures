<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\UserAddress;
use App\Services\PaystackService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected PaystackService $paystackService;

    public function __construct(PaystackService $paystackService)
    {
        $this->paystackService = $paystackService;
    }

    public function redirectToGateway(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to complete your order.');
        }

        // Validate and get data from request
        $validated = $request->validate([
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'address_id' => 'required|exists:user_addresses,id',
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        $cart = $validated['cart'];
        $addressId = $validated['address_id'];
        $fullName = $validated['full_name'];
        $phone = $validated['phone'];

        $user = Auth::user();

        try {
            // Calculate total amount
            $totalAmount = 0;
            foreach ($cart as $item) {
                $product = Product::findOrFail($item['id']);
                $quantity = $item['quantity'] ?? 1;
                $subtotal = $product->price * $quantity;
                $totalAmount += $subtotal;
            }

            // Get address - verify it belongs to user
            $address = $user->addresses()->find($addressId);
            if (!$address) {
                return redirect()->route('checkout.index')->with('error', 'Selected address not found.');
            }

            // Update user's full_name and phone
            $user->full_name = $fullName;
            $user->phone = $phone;
            $user->save();

            // Generate unique order number
            $orderNumber = 'ORD-' . strtoupper(uniqid());

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => $orderNumber,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'shipping_address_id' => $address->id,
            ]);

            // Create order items
            foreach ($cart as $item) {
                $product = Product::findOrFail($item['id']);
                $quantity = $item['quantity'] ?? 1;
                $price = $product->price;
                $subtotal = $price * $quantity;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                    'subtotal' => $subtotal,
                ]);
            }

            // Generate payment reference
            $reference = 'PAY-' . strtoupper(uniqid());

            // Create payment record
            $payment = Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'payment_reference' => $reference,
                'amount' => $totalAmount,
                'currency' => 'GHS',
                'payment_method' => 'paystack',
                'status' => 'pending',
                'processed_at' => null,
            ]);

            // Prepare Paystack data
            // Note: This will work once Paystack package is properly installed
            // For now, we'll create the structure
            $paystackData = [
                'amount' => $totalAmount * 100, // Convert to pesewas
                'currency' => 'GHS',
                'email' => $user->email,
                'reference' => $reference,
                'callback_url' => route('payment.callback'),
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $orderNumber,
                    'user_id' => $user->id,
                ],
            ];

            // Clear session data
            $request->session()->forget([
                'checkout_cart',
                'checkout_address_id',
                'checkout_region',
                'checkout_town',
                'checkout_address',
                'checkout_full_name',
                'checkout_phone',
            ]);

            // Initialize Paystack payment
            try {
                $url = $this->paystackService->getAuthorizationUrl($paystackData);
                return Inertia::location($url->url);
            } catch (Exception $e) {
                Log::error('Paystack payment initialization failed', [
                    'error' => $e->getMessage(),
                    'order_id' => $order->id,
                ]);

                return redirect()->route('checkout.index')
                    ->with('error', 'Could not initiate payment. Please try again.');
            }
        } catch (Exception $e) {
            return redirect()->route('checkout.index')->with('error', 'Could not initiate payment. Please try again.');
        }
    }

    public function handleGatewayCallback()
    {
        try {
            $paymentDetails = $this->paystackService->getPaymentData();
            $reference = $paymentDetails['data']['reference'] ?? null;
            $transactionId = $paymentDetails['data']['id'] ?? null;
            $status = $paymentDetails['data']['status'] ?? null;

            if (!$reference) {
                return redirect()->route('checkout.index')
                    ->with('error', 'Payment reference not found.');
            }

            return $this->processPayment($reference, $transactionId, $status);
        } catch (Exception $e) {
            Log::error('Paystack callback error', [
                'error' => $e->getMessage(),
                'reference' => request()->get('reference'),
            ]);

            return redirect()->route('checkout.index')
                ->with('error', 'An error occurred during payment processing.');
        }
    }

    public function handleWebhook(Request $request)
    {
        try {
            $event = $request->input('event');
            $data = $request->input('data');

            // Verify the webhook is from Paystack (only in production)
            if (config('app.env') === 'production') {
                $hash = $request->header('x-paystack-signature');
                $payload = $request->getContent();

                if (!$this->verifyWebhookSignature($payload, $hash)) {
                    Log::warning('Invalid Paystack webhook signature');
                    return response()->json(['status' => 'invalid signature'], 400);
                }
            }

            if ($event === 'charge.success' && isset($data['reference'])) {
                $reference = $data['reference'];
                $transactionId = $data['id'] ?? null;
                $status = $data['status'] ?? 'success';

                // Process payment (webhook doesn't return redirects)
                $this->processPaymentWebhook($reference, $transactionId, $status);

                return response()->json(['status' => 'success'], 200);
            }

            return response()->json(['status' => 'ignored'], 200);
        } catch (Exception $e) {
            Log::error('Paystack webhook error', [
                'error' => $e->getMessage(),
                'event' => $request->input('event'),
            ]);

            return response()->json(['status' => 'error'], 500);
        }
    }

    /**
     * Verify Paystack webhook signature
     */
    protected function verifyWebhookSignature(string $payload, ?string $signature): bool
    {
        if (!$signature) {
            return false;
        }

        $hash = hash_hmac('sha512', $payload, config('services.paystack.secret_key', ''));

        return hash_equals($hash, $signature);
    }

    protected function processPayment(string $reference, ?string $transactionId = null, ?string $status = null)
    {
        $result = $this->processPaymentWebhook($reference, $transactionId, $status);

        if ($result === null) {
            return redirect()->route('checkout.index')
                ->with('error', 'Payment record not found.');
        }

        if ($result['status'] === 'completed') {
            return redirect()->route('account.orders.show', $result['order_id'])
                ->with('success', 'Payment successful! Your order is being processed.');
        } else {
            return redirect()->route('checkout.index')
                ->with('error', 'Payment failed. Please try again.');
        }
    }

    protected function processPaymentWebhook(string $reference, ?string $transactionId = null, ?string $status = null): ?array
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

            // Determine payment status
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
