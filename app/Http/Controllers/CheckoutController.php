<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $addresses = $user->addresses()->orderBy('is_default', 'desc')->get();
        $regions = collect(config('regions'))->where('enabled', true)->values();

        return Inertia::render('checkout/index', [
            'addresses' => $addresses,
            'regions' => $regions,
            'user' => [
                'full_name' => $user->full_name,
                'phone' => $user->phone,
                'email' => $user->email,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'address_id' => 'nullable|exists:user_addresses,id',
            'region' => 'required_without:address_id|string|filled',
            'town' => 'required_without:address_id|string|filled',
            'address' => 'required_without:address_id|string|filled',
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'save_address' => 'boolean',
        ]);

        $user = Auth::user();

        $shippingRegion = $validated['region'] ?? null;
        $shippingTown = $validated['town'] ?? null;
        $shippingAddressLine = $validated['address'] ?? null;

        // Verify address belongs to user if address_id is provided
        if (isset($validated['address_id'])) {
            $address = $user->addresses()->find($validated['address_id']);
            if (!$address) {
                return back()->with('error', 'Selected address not found.');
            }
            $shippingRegion = $address->region;
            $shippingTown = $address->town;
            $shippingAddressLine = $address->address;
        } else {
            // Validate region is enabled
            $regions = config('regions');
            $regionEnabled = collect($regions)->firstWhere('name', $validated['region']);

            if (!$regionEnabled || !$regionEnabled['enabled']) {
                return back()->with('error', 'Selected region is not available.');
            }

            // Create new address if save_address is true
            if ($validated['save_address'] ?? false) {
                $user->addresses()->create([
                    'region' => $validated['region'],
                    'town' => $validated['town'],
                    'address' => $validated['address'],
                    'is_default' => $user->addresses()->count() === 0,
                ]);
            }
            // If save_address is false, we don't pollute the DB with a temporary address.
        }

        // Update user's full_name and phone
        $user->full_name = $validated['full_name'];
        $user->phone = $validated['phone'];
        $user->save();

        // Delegate to PaymentController to initiate payment (cho pattern: single request flow)
        $paymentController = app(PaymentController::class);

        // Build a new request with the data the PaymentController expects
        $paymentRequest = new Request([
            'cart' => $validated['cart'],
            'full_name' => $validated['full_name'],
            'phone' => $validated['phone'],
            'shipping_region' => $shippingRegion,
            'shipping_town' => $shippingTown,
            'shipping_address' => $shippingAddressLine,
        ]);

        // Copy over the session from the original request
        $paymentRequest->setLaravelSession($request->session());

        return $paymentController->redirectToGateway($paymentRequest);
    }
}

