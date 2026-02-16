import { Head, Link, router, usePage } from '@inertiajs/react';
import { ProductCard } from '@/components/product-card';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cart-store';
import { useState } from 'react';
import { EcommerceFooter } from '@/components/ecommerce-footer';

export default function ProductShow({ product, relatedProducts = [] }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isAdding, setIsAdding] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { auth } = usePage().props;


    // Ensure relatedProducts is always an array
    const safeRelatedProducts = Array.isArray(relatedProducts) ? relatedProducts : [];
    
    // Early return if product is invalid
    if (!product) {
        return null;
    }

    // Handle case where product might not exist or is null/undefined
    if (!product || typeof product !== 'object') {
        return (
            <EcommerceLayout>
                <Head title="Product Not Found - Elite Alfa Ventures" />
                <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-[var(--color-deep-blue)] mb-4 text-3xl font-bold">Product Not Found</h1>
                        <p className="text-[var(--color-brown)] mb-8 text-lg">The product you're looking for doesn't exist or has been removed.</p>
                        <Link href="/shop">
                            <Button className="bg-[var(--color-deep-blue)] text-white">
                                Back to Shop
                            </Button>
                        </Link>
                    </div>
                </main>
                <EcommerceFooter />
            </EcommerceLayout>
        );
    }

    // Safely extract data with defaults
    const images = Array.isArray(product.images) ? product.images : [];
    const currentImage = images[selectedImageIndex]?.image_path || null;
    const productName = product.name || 'Product';
    const productDescription = product.description || '';
    const productPrice = product.price || 0;
    const productCategory = product.category || null;

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
        setTimeout(() => setIsAdding(false), 500);
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Add to cart first
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
        
        // Check if user is authenticated
        if (auth?.user) {
            // Navigate to checkout
            router.visit('/checkout');
        } else {
            // Redirect to login with return URL
            router.visit('/login?redirect=/checkout');
        }
    };

    return (
        <EcommerceLayout>
            <Head title={`${productName} - Elite Alfa Ventures | Premium Luxury Products`} />

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <Link href="/" className="text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]">
                        Home
                    </Link>
                    <span className="mx-2 text-[var(--color-brown)]">/</span>
                    <Link href="/shop" className="text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]">
                        Shop
                    </Link>
                    {productCategory && (
                        <>
                            <span className="mx-2 text-[var(--color-brown)]">/</span>
                            <Link
                                href={`/shop?category=${productCategory.slug}`}
                                className="text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]"
                            >
                                {productCategory.name}
                            </Link>
                        </>
                    )}
                    <span className="mx-2 text-[var(--color-brown)]">/</span>
                    <span className="text-[var(--color-deep-blue)]">{productName}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[var(--color-off-white)]">
                            {currentImage ? (
                                <img
                                    src={currentImage}
                                    alt={productName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-off-white)] to-gray-100">
                                    <span className="text-6xl opacity-20">📦</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Navigation */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                                            selectedImageIndex === index
                                                ? 'border-[var(--color-mustard-gold)] ring-2 ring-[var(--color-mustard-gold)]/20'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={image.image_path}
                                            alt={`${productName} ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-[var(--color-deep-blue)] text-3xl font-bold tracking-tight">
                                {productName}
                            </h1>
                            {productCategory && (
                                <Link
                                    href={`/shop?category=${productCategory.slug}`}
                                    className="text-[var(--color-mustard-gold)] hover:underline mt-2 inline-block"
                                >
                                    {productCategory.name}
                                </Link>
                            )}
                        </div>

                        <div className="mt-4">
                            <span className="text-[var(--color-deep-blue)] text-4xl font-bold">
                                ₵{Number(productPrice).toLocaleString()}
                            </span>
                        </div>

                        <div>
                            <p className="text-[var(--color-brown)] text-base leading-relaxed">
                                {productDescription}
                            </p>
                        </div>

                        <div className="pt-4 space-y-3">
                            <Button
                                size="lg"
                                className="w-full bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-lg"
                                onClick={handleAddToCart}
                                disabled={isAdding || isCheckingOut || (product.stock_quantity !== undefined && product.stock_quantity <= 0)}
                            >
                                {isAdding ? 'Added to Cart!' : 'Add to Cart'}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full border-[var(--color-deep-blue)] bg-white text-[var(--color-deep-blue)] transition-all duration-300 hover:bg-[var(--color-deep-blue)] hover:text-white hover:shadow-lg"
                                onClick={handleCheckout}
                                disabled={isAdding || isCheckingOut || (product.stock_quantity !== undefined && product.stock_quantity <= 0)}
                            >
                                {isCheckingOut ? 'Processing...' : 'Checkout Now'}
                            </Button>
                        </div>

                        {product.stock_quantity !== undefined && (
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-[var(--color-brown)]">
                                    {product.stock_quantity > 0
                                        ? `In Stock (${product.stock_quantity} available)`
                                        : 'Out of Stock'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {safeRelatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-[var(--color-deep-blue)] mb-8 text-2xl font-bold">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {safeRelatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <EcommerceFooter />
        </EcommerceLayout>
    );
}
