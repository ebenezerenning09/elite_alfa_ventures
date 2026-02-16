<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $watchesCategory = Category::where('slug', 'watches')->first();
        $jewelriesCategory = Category::where('slug', 'jewelries')->first();
        $bagsCategory = Category::where('slug', 'bags')->first();
        $accessoriesCategory = Category::where('slug', 'accessories')->first();

        $products = [
            [
                'name' => 'Luxury Watch Collection',
                'description' => 'Elegant timepiece with premium materials and timeless design',
                'price' => 150000,
                'category_id' => $watchesCategory->id,
                'stock_quantity' => 10,
                'status' => 'active',
            ],
            [
                'name' => 'Designer Handbag',
                'description' => 'Stylish and sophisticated accessory for the modern woman',
                'price' => 85000,
                'category_id' => $bagsCategory->id,
                'stock_quantity' => 15,
                'status' => 'active',
            ],
            [
                'name' => 'Gold Necklace',
                'description' => 'Exquisite jewelry piece crafted with precision',
                'price' => 200000,
                'category_id' => $jewelriesCategory->id,
                'stock_quantity' => 8,
                'status' => 'active',
            ],
            [
                'name' => 'Leather Wallet',
                'description' => 'Premium quality leather accessory with elegant finish',
                'price' => 25000,
                'category_id' => $accessoriesCategory->id,
                'stock_quantity' => 20,
                'status' => 'active',
            ],
            [
                'name' => 'Silver Bracelet',
                'description' => 'Beautiful silver jewelry for everyday elegance',
                'price' => 45000,
                'category_id' => $jewelriesCategory->id,
                'stock_quantity' => 12,
                'status' => 'active',
            ],
            [
                'name' => 'Designer Sunglasses',
                'description' => 'Stylish eye protection with UV filter technology',
                'price' => 35000,
                'category_id' => $accessoriesCategory->id,
                'stock_quantity' => 18,
                'status' => 'active',
            ],
            [
                'name' => 'Diamond Ring',
                'description' => 'Stunning diamond ring for special occasions',
                'price' => 500000,
                'category_id' => $jewelriesCategory->id,
                'stock_quantity' => 5,
                'status' => 'active',
            ],
            [
                'name' => 'Leather Belt',
                'description' => 'Classic leather belt with modern buckle design',
                'price' => 18000,
                'category_id' => $accessoriesCategory->id,
                'stock_quantity' => 25,
                'status' => 'active',
            ],
        ];

        // Product images mapping
        $productImages = [
            'Luxury Watch Collection' => [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
                'https://images.unsplash.com/photo-1533139502-a4740973986e?w=800',
            ],
            'Designer Handbag' => [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
            ],
            'Gold Necklace' => [
                'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
                'https://images.unsplash.com/photo-1603561596112-0a13211a555a?w=800',
            ],
            'Leather Wallet' => [
                'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
                'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
            ],
            'Silver Bracelet' => [
                'https://images.unsplash.com/photo-1603561596112-0a13211a555a?w=800',
                'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            ],
            'Designer Sunglasses' => [
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
            ],
            'Diamond Ring' => [
                'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
                'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            ],
            'Leather Belt' => [
                'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
                'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
            ],
        ];

        foreach ($products as $productData) {
            $product = Product::create($productData);
            
            // Add images for the product
            $images = $productImages[$productData['name']] ?? [
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
            ];
            
            foreach ($images as $imagePath) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imagePath,
                ]);
            }
        }

        // Generate additional products for pagination testing
        $additionalProducts = [
            // More Watches
            ['Premium Chronograph Watch', 'High-precision timepiece with chronograph functionality', 180000, $watchesCategory->id],
            ['Classic Leather Strap Watch', 'Timeless design with genuine leather strap', 120000, $watchesCategory->id],
            ['Sports Digital Watch', 'Durable sports watch with digital display', 95000, $watchesCategory->id],
            ['Luxury Gold Watch', 'Elegant gold-plated watch for special occasions', 250000, $watchesCategory->id],
            ['Smart Watch Pro', 'Modern smartwatch with fitness tracking', 200000, $watchesCategory->id],
            
            // More Jewelries
            ['Pearl Earrings', 'Classic pearl earrings for elegant occasions', 75000, $jewelriesCategory->id],
            ['Platinum Ring', 'Exquisite platinum ring with intricate design', 300000, $jewelriesCategory->id],
            ['Emerald Pendant', 'Beautiful emerald pendant on gold chain', 180000, $jewelriesCategory->id],
            ['Ruby Bracelet', 'Stunning ruby bracelet with gold accents', 220000, $jewelriesCategory->id],
            ['Sapphire Necklace', 'Elegant sapphire necklace for special events', 280000, $jewelriesCategory->id],
            
            // More Bags
            ['Designer Tote Bag', 'Spacious tote bag with premium materials', 95000, $bagsCategory->id],
            ['Leather Crossbody Bag', 'Compact crossbody bag in genuine leather', 65000, $bagsCategory->id],
            ['Evening Clutch', 'Elegant evening clutch for formal events', 55000, $bagsCategory->id],
            ['Travel Backpack', 'Stylish travel backpack with multiple compartments', 85000, $bagsCategory->id],
            ['Mini Shoulder Bag', 'Trendy mini shoulder bag in various colors', 45000, $bagsCategory->id],
            
            // More Accessories
            ['Silk Scarf', 'Luxurious silk scarf with elegant patterns', 35000, $accessoriesCategory->id],
            ['Leather Gloves', 'Premium leather gloves for cold weather', 40000, $accessoriesCategory->id],
            ['Designer Hat', 'Stylish designer hat for sun protection', 30000, $accessoriesCategory->id],
            ['Gold Cufflinks', 'Elegant gold cufflinks for formal wear', 50000, $accessoriesCategory->id],
            ['Pocket Square Set', 'Set of premium pocket squares', 25000, $accessoriesCategory->id],
        ];

        foreach ($additionalProducts as $productData) {
            $product = Product::create([
                'name' => $productData[0],
                'description' => $productData[1],
                'price' => $productData[2],
                'category_id' => $productData[3],
                'stock_quantity' => rand(5, 30),
                'status' => 'active',
            ]);
            
            // Add default image
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
            ]);
        }
    }
}
