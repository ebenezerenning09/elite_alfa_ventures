<?php

namespace App\Http\Controllers\Admin\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\StoreProductRequest;
use App\Http\Requests\Admin\Products\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images']);

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by category
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Sorting
        $sortBy = $request->input('sort_by', 'latest');
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $perPage = $request->input('per_page', 30);
        $perPage = min(max((int) $perPage, 1), 50);

        $products = $query->paginate($perPage)->withQueryString();
        $categories = Category::all();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only('search', 'status', 'category_id', 'sort_by'),
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('admin/products/create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        // Remove images from validated data before creating product
        unset($data['images']);

        $product = Product::create($data);

        // Handle image uploads
        if ($request->hasFile('images')) {
            $uploadedImages = $request->file('images');

            // Handle both single file and array of files
            $files = is_array($uploadedImages) ? $uploadedImages : [$uploadedImages];

            foreach ($files as $image) {
                if ($image && $image->isValid()) {
                    // Store the image file
                    $imagePath = $image->store('products', 'public');

                    // Create database record with the storage path
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => Storage::url($imagePath), // Returns /storage/products/filename.jpg
                    ]);
                }
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    public function show($id)
    {
        $product = Product::with(['category', 'images', 'orderItems'])->findOrFail($id);

        return Inertia::render('admin/products/show', [
            'product' => $product,
        ]);
    }

    public function edit($id)
    {
        $product = Product::with('images')->findOrFail($id);
        $categories = Category::all();

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validated();

        // Remove images from validated data before updating product
        unset($data['images'], $data['delete_images']);

        $product->update($data);

        // Handle image deletions
        if ($request->has('delete_images')) {
            foreach ($request->delete_images as $imageId) {
                $image = ProductImage::find($imageId);
                if ($image) {
                    // Delete file from storage if it's a local file
                    if (str_starts_with($image->image_path, '/storage/')) {
                        $filePath = str_replace('/storage/', '', $image->image_path);
                        Storage::disk('public')->delete($filePath);
                    }
                    $image->delete();
                }
            }
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $uploadedImages = $request->file('images');

            // Handle both single file and array of files
            $files = is_array($uploadedImages) ? $uploadedImages : [$uploadedImages];

            foreach ($files as $image) {
                if ($image && $image->isValid()) {
                    // Store the image file
                    $imagePath = $image->store('products', 'public');

                    // Create database record with the storage path
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => Storage::url($imagePath), // Returns /storage/products/filename.jpg
                    ]);
                }
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
