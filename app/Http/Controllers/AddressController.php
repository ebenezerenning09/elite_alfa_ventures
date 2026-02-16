<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Auth::user()->addresses()->orderBy('is_default', 'desc')->get();
        $regions = collect(config('regions'))->where('enabled', true)->values();
        $user = Auth::user();

        return Inertia::render('account/addresses/index', [
            'addresses' => $addresses,
            'regions' => $regions,
            'user' => [
                'full_name' => $user->full_name,
                'phone' => $user->phone,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'region' => 'required|string',
            'town' => 'required|string',
            'address' => 'required|string',
            'is_default' => 'boolean',
            'full_name' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        // Validate region is enabled
        $regions = config('regions');
        $regionEnabled = collect($regions)->firstWhere('name', $validated['region']);
        
        if (!$regionEnabled || !$regionEnabled['enabled']) {
            return back()->withErrors(['region' => 'Selected region is not available.']);
        }

        $user = Auth::user();

        // Update user's full_name and phone if provided
        if (isset($validated['full_name'])) {
            $user->full_name = $validated['full_name'];
        }
        if (isset($validated['phone'])) {
            $user->phone = $validated['phone'];
        }
        $user->save();

        // If this is set as default, unset other defaults
        if ($validated['is_default'] ?? false) {
            $user->addresses()->update(['is_default' => false]);
        }

        $address = $user->addresses()->create([
            'region' => $validated['region'],
            'town' => $validated['town'],
            'address' => $validated['address'],
            'is_default' => $validated['is_default'] ?? false,
        ]);

        return redirect()->route('account.addresses.index')->with('success', 'Address added successfully.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'region' => 'required|string',
            'town' => 'required|string',
            'address' => 'required|string',
            'is_default' => 'boolean',
            'full_name' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        // Validate region is enabled
        $regions = config('regions');
        $regionEnabled = collect($regions)->firstWhere('name', $validated['region']);
        
        if (!$regionEnabled || !$regionEnabled['enabled']) {
            return back()->withErrors(['region' => 'Selected region is not available.']);
        }

        $user = Auth::user();
        $address = $user->addresses()->findOrFail($id);

        // Update user's full_name and phone if provided
        if (isset($validated['full_name'])) {
            $user->full_name = $validated['full_name'];
        }
        if (isset($validated['phone'])) {
            $user->phone = $validated['phone'];
        }
        $user->save();

        // If this is set as default, unset other defaults
        if ($validated['is_default'] ?? false) {
            $user->addresses()->where('id', '!=', $id)->update(['is_default' => false]);
        }

        $address->update([
            'region' => $validated['region'],
            'town' => $validated['town'],
            'address' => $validated['address'],
            'is_default' => $validated['is_default'] ?? false,
        ]);

        return redirect()->route('account.addresses.index')->with('success', 'Address updated successfully.');
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $address = $user->addresses()->findOrFail($id);
        $address->delete();

        return redirect()->route('account.addresses.index')->with('success', 'Address deleted successfully.');
    }

    public function setDefault($id)
    {
        $user = Auth::user();
        $address = $user->addresses()->findOrFail($id);

        // Unset all other defaults
        $user->addresses()->update(['is_default' => false]);

        // Set this as default
        $address->update(['is_default' => true]);

        return redirect()->route('account.addresses.index')->with('success', 'Default address updated.');
    }

    public function getRegions()
    {
        $regions = config('regions');
        $enabledRegions = collect($regions)->where('enabled', true)->values();

        return response()->json($enabledRegions);
    }
}
