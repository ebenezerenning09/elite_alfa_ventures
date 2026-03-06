import { EcommerceFooter } from '@/components/ecommerce-footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import useCartStore from '@/stores/cart-store';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CheckCircle, ShoppingCart, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export default function ProductShow({ product, relatedProducts = [] }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const cartItems = useCartStore((state) => state.cartItems);

    // Check if product is already in the cart
    const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;

    const [isAdding, setIsAdding] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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
                        <h1 className="mb-4 text-3xl font-bold text-[var(--color-deep-blue)]">Product Not Found</h1>
                        <p className="mb-8 text-lg text-[var(--color-brown)]">The product you're looking for doesn't exist or has been removed.</p>
                        <Link href="/shop">
                            <Button className="bg-[var(--color-deep-blue)] text-white">Back to Shop</Button>
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
            images: product.images,
            image: product.image,
        });

        // Dispatch custom toast event
        const event = new CustomEvent('toast', {
            detail: { type: 'success', message: `${productName} added to cart!` },
        });
        window.dispatchEvent(event);

        setTimeout(() => setIsAdding(false), 500);
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);

        // If not already in cart, add it before checking out
        if (!isInCart) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                images: product.images,
                image: product.image,
            });
        }

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
                        <div
                            className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg bg-[var(--color-off-white)]"
                            onClick={() => currentImage && setIsImageModalOpen(true)}
                        >
                            {currentImage ? (
                                <>
                                    <img
                                        src={currentImage}
                                        alt={productName}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <ZoomIn className="h-12 w-12 text-white" />
                                    </div>
                                </>
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
                                        <img src={image.image_path} alt={`${productName} ${index + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-deep-blue)]">{productName}</h1>
                            {productCategory && (
                                <Link
                                    href={`/shop?category=${productCategory.slug}`}
                                    className="mt-2 inline-block text-[var(--color-mustard-gold)] hover:underline"
                                >
                                    {productCategory.name}
                                </Link>
                            )}
                        </div>

                        <div className="mt-4">
                            <span className="text-4xl font-bold text-[var(--color-deep-blue)]">₵{Number(productPrice).toLocaleString()}</span>
                        </div>

                        <div>
                            <p className="text-base leading-relaxed text-[var(--color-brown)]">{productDescription}</p>
                        </div>

                        <div className="space-y-3 pt-4">
                            {isInCart ? (
                                <>
                                    <Button
                                        size="lg"
                                        className="flex w-full items-center justify-center gap-2 bg-emerald-600 text-white shadow-emerald-600/20 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-700 hover:shadow-lg"
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut || (product.stock_quantity !== undefined && product.stock_quantity <= 0)}
                                    >
                                        {isCheckingOut ? (
                                            'Processing...'
                                        ) : (
                                            <>
                                                <CheckCircle className="h-5 w-5" /> Checkout Now
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="flex w-full items-center justify-center gap-2 border-gray-300 bg-gray-50 text-emerald-700 transition-all duration-300 hover:bg-gray-100"
                                        onClick={() => router.visit('/shop')}
                                    >
                                        Continue Shopping
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="lg"
                                        className="flex w-full items-center justify-center gap-2 bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-lg"
                                        onClick={handleAddToCart}
                                        disabled={isAdding || isCheckingOut || (product.stock_quantity !== undefined && product.stock_quantity <= 0)}
                                    >
                                        {isAdding ? (
                                            'Adding...'
                                        ) : (
                                            <>
                                                <ShoppingCart className="h-5 w-5" /> Add to Cart
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full border-[var(--color-deep-blue)] bg-white text-[var(--color-deep-blue)] transition-all duration-300 hover:bg-[var(--color-deep-blue)] hover:text-white hover:shadow-lg"
                                        onClick={handleCheckout}
                                        disabled={isAdding || isCheckingOut || (product.stock_quantity !== undefined && product.stock_quantity <= 0)}
                                    >
                                        {isCheckingOut ? 'Processing...' : 'Buy Now'}
                                    </Button>
                                </>
                            )}
                        </div>

                        {product.stock_quantity !== undefined && (
                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-[var(--color-brown)]">
                                    {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity} available)` : 'Out of Stock'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {safeRelatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="mb-8 text-2xl font-bold text-[var(--color-deep-blue)]">Related Products</h2>
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

            {/* Image Zoom Modal */}
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent
                    className="max-w-[95vw] overflow-hidden border-none bg-transparent p-0 shadow-none md:max-w-[80vw] lg:max-w-5xl [&>button]:top-2 [&>button]:right-2 [&>button]:rounded-full [&>button]:bg-black/40 [&>button]:p-2 [&>button]:text-white hover:[&>button]:bg-black/60 sm:[&>button]:top-4 sm:[&>button]:right-4 [&>button_svg]:h-5 [&>button_svg]:w-5"
                    aria-describedby={undefined}
                >
                    <DialogTitle className="sr-only">Product Image Zoom</DialogTitle>
                    {currentImage && (
                        <div className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden rounded-lg bg-black/10 backdrop-blur-sm">
                            <img src={currentImage} alt={productName} className="h-full w-full object-contain p-4" />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </EcommerceLayout>
    );
}
