<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        return Inertia::render('account/profile', [
            'user' => [
                'name' => $user->name,
                'full_name' => $user->full_name,
                'phone' => $user->phone,
                'email' => $user->email,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'full_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.Auth::id(),
        ]);

        $user = Auth::user();
        $user->update($validated);

        return redirect()->route('account.profile')->with('success', 'Profile updated successfully.');
    }
}
