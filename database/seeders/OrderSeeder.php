<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->first();
        
        if (!$user) {
            $this->command->warn('Test user not found. Please run UserSeeder first.');
            return;
        }

        // Create a default address for the user if none exists
        $address = $user->addresses()->first();
        if (!$address) {
            $address = UserAddress::create([
                'user_id' => $user->id,
                'region' => 'Ashanti',
                'town' => 'Kumasi',
                'address' => '123 Test Street, KNUST',
                'is_default' => true,
            ]);
        }

        $products = Product::where('status', 'active')->get();
        
        if ($products->isEmpty()) {
            $this->command->warn('No products found. Please run ProductSeeder first.');
            return;
        }

        $statuses = ['pending', 'processing', 'completed', 'delivered', 'cancelled'];
        $paymentStatuses = ['pending', 'completed', 'failed'];

        // Create 20 orders for pagination testing
        for ($i = 1; $i <= 20; $i++) {
            $orderNumber = 'ORD-' . strtoupper(uniqid());
            $status = $statuses[array_rand($statuses)];
            
            // Select random products for this order
            $orderProducts = $products->random(rand(1, 3));
            $totalAmount = 0;
            
            foreach ($orderProducts as $product) {
                $quantity = rand(1, 3);
                $totalAmount += $product->price * $quantity;
            }

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => $orderNumber,
                'total_amount' => $totalAmount,
                'status' => $status,
                'shipping_address_id' => $address->id,
                'created_at' => now()->subDays(rand(0, 30)),
            ]);

            // Create order items
            foreach ($orderProducts as $product) {
                $quantity = rand(1, 3);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                    'subtotal' => $product->price * $quantity,
                ]);
            }

            // Create payment record (only for pending/processing orders)
            if (in_array($status, ['pending', 'processing'])) {
                $paymentStatus = $status === 'pending' ? 'pending' : 'completed';
                $payment = Payment::create([
                    'order_id' => $order->id,
                    'user_id' => $user->id,
                    'payment_reference' => 'PAY-' . strtoupper(uniqid()),
                    'amount' => $totalAmount,
                    'currency' => 'GHS',
                    'payment_method' => 'paystack',
                    'status' => $paymentStatus,
                    'processed_at' => $paymentStatus === 'completed' ? now() : null,
                    'payment_date' => $paymentStatus === 'completed' ? now() : null,
                ]);
            } elseif ($status === 'completed' || $status === 'delivered') {
                // Completed orders should have completed payments
                Payment::create([
                    'order_id' => $order->id,
                    'user_id' => $user->id,
                    'payment_reference' => 'PAY-' . strtoupper(uniqid()),
                    'amount' => $totalAmount,
                    'currency' => 'GHS',
                    'payment_method' => 'paystack',
                    'status' => 'completed',
                    'processed_at' => now()->subDays(rand(1, 20)),
                    'payment_date' => now()->subDays(rand(1, 20)),
                ]);
            }
        }

        $this->command->info('Created 20 orders for testing pagination.');
    }
}
