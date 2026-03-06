import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import useCartStore from '@/stores/cart-store';
import { Link, router } from '@inertiajs/react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const cartItems = useCartStore((state) => state.cartItems);

    // Check if product is already in the cart
    const isInCart = cartItems.some((item) => item.id === product.id);

    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        setIsAdding(true);
        addToCart({
            ...product,
            quantity: 1,
        });

        // Dispatch custom toast event
        const event = new CustomEvent('toast', {
            detail: { type: 'success', message: `${product.name} added to cart!` },
        });
        window.dispatchEvent(event);

        setTimeout(() => setIsAdding(false), 500);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        router.visit('/checkout');
    };

    return (
        <Card className="group flex h-full flex-col overflow-hidden border-gray-200/50 bg-white transition-all duration-300 hover:border-[var(--color-mustard-gold)]/30 hover:shadow-xl">
            <Link href={`/products/${product.id}`} className="block flex-1">
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-off-white)]">
                    {product.images && product.images.length > 0 && product.images[0]?.image_path ? (
                        <img
                            src={product.images[0].image_path}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-off-white)] to-gray-100">
                            <span className="text-6xl opacity-20">📦</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-semibold text-[var(--color-deep-blue)]">{product.name}</h3>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-brown)]">{product.description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[var(--color-deep-blue)]">₵{Number(product.price).toLocaleString()}</span>
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="p-5 pt-0">
                {isInCart ? (
                    <Button
                        className="group flex w-full items-center justify-center gap-2 bg-emerald-600 text-white shadow-emerald-600/20 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-700 hover:shadow-lg"
                        onClick={handleCheckout}
                    >
                        <CheckCircle className="h-4 w-4" /> Checkout
                    </Button>
                ) : (
                    <Button
                        className="flex w-full items-center justify-center gap-2 bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-md"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            'Adding...'
                        ) : (
                            <>
                                <ShoppingCart className="h-4 w-4" /> Add to Cart
                            </>
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
