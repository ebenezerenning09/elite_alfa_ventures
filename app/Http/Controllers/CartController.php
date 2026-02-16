<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function sync(Request $request)
    {
        $user = Auth::user();
        $cartItems = $request->input('cart', []);

        // For now, we'll just return success
        // Cart sync logic can be implemented later if needed
        // The cart is primarily stored in localStorage

        return response()->json([
            'success' => true,
            'message' => 'Cart synced successfully',
        ]);
    }

    public function get()
    {
        $user = Auth::user();

        // Return empty cart for now
        // Can be extended to store cart in database if needed
        return response()->json([
            'cart' => [],
        ]);
    }
}
