import { Head, Link, router } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cart-store';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();

    const total = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) || 0) * (item.quantity || 1);
    }, 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            return;
        }
        router.visit('/checkout');
    };

    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0].image_path;
        }
        return product.image || null;
    };

    return (
        <EcommerceLayout>
            <Head title="Shopping Cart - Elite Alfa Ventures" />

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">
                        Shopping Cart
                    </h1>
                    <p className="text-[var(--color-brown)] mt-3 text-lg">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => {
                                const image = getProductImage(item);
                                const itemTotal = (Number(item.price) || 0) * (item.quantity || 1);

                                return (
                                    <div
                                        key={item.cartId}
                                        className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                                    >
                                        {/* Product Image */}
                                        <Link
                                            href={`/products/${item.id}`}
                                            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-off-white)]"
                                        >
                                            {image ? (
                                                <img
                                                    src={image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                                                </div>
                                            )}
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col">
                                            <Link
                                                href={`/products/${item.id}`}
                                                className="text-[var(--color-deep-blue)] font-semibold hover:text-[var(--color-mustard-gold)] transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-[var(--color-brown)] mt-1 text-sm line-clamp-2">
                                                {item.description}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between pt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => {
                                                            const newQty = Math.max(1, (item.quantity || 1) - 1);
                                                            updateQuantity(item.cartId, newQty);
                                                        }}
                                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-[var(--color-brown)] transition-colors hover:bg-gray-100"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="text-[var(--color-deep-blue)] w-12 text-center font-medium">
                                                        {item.quantity || 1}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            const newQty = (item.quantity || 1) + 1;
                                                            updateQuantity(item.cartId, newQty);
                                                        }}
                                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-[var(--color-brown)] transition-colors hover:bg-gray-100"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Price and Remove */}
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[var(--color-deep-blue)] text-lg font-bold">
                                                        ₵{itemTotal.toLocaleString()}
                                                    </span>
                                                    <button
                                                        onClick={() => removeFromCart(item.cartId)}
                                                        className="text-red-500 hover:text-red-700 transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="text-[var(--color-deep-blue)] mb-4 text-xl font-bold">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 border-b border-gray-200 pb-4">
                                    <div className="flex justify-between text-[var(--color-brown)]">
                                        <span>Subtotal</span>
                                        <span>₵{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-brown)]">
                                        <span>Shipping</span>
                                        <span className="text-sm">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <span className="text-[var(--color-deep-blue)] text-lg font-bold">Total</span>
                                    <span className="text-[var(--color-deep-blue)] text-2xl font-bold">
                                        ₵{total.toLocaleString()}
                                    </span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="mt-6 w-full bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-lg"
                                    size="lg"
                                >
                                    Proceed to Checkout
                                </Button>

                                <Link href="/shop" className="mt-3 block">
                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50 hover:text-[var(--color-brown)]"
                                    >
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                        <h2 className="text-[var(--color-deep-blue)] mt-4 text-2xl font-bold">
                            Your cart is empty
                        </h2>
                        <p className="text-[var(--color-brown)] mt-2">Start adding items to your cart!</p>
                        <Link href="/shop" className="mt-6 inline-block">
                            <Button className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                )}
            </main>
        </EcommerceLayout>
    );
}
