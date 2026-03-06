import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export function OrderSummary({ cartItems = [], total, processing = false, getProductImage }) {
    return (
        <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[var(--color-deep-blue)]">Order Summary</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4">
                {cartItems.map((item) => {
                    const itemTotal = (Number(item.price) || 0) * (item.quantity || 1);
                    const image = getProductImage(item);

                    return (
                        <div key={item.cartId} className="flex gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-off-white)]">
                                {image ? (
                                    <img src={image} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <ShoppingBag className="h-6 w-6 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-[var(--color-deep-blue)]">{item.name}</div>
                                <div className="text-xs text-[var(--color-brown)]">Qty: {item.quantity || 1}</div>
                                <div className="mt-1 text-sm font-semibold text-[var(--color-deep-blue)]">₵{itemTotal.toLocaleString()}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 space-y-2 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-[var(--color-brown)]">
                    <span>Subtotal</span>
                    <span>₵{total.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <span className="text-lg font-bold text-[var(--color-deep-blue)]">Total</span>
                <span className="text-2xl font-bold text-[var(--color-deep-blue)]">₵{total.toLocaleString()}</span>
            </div>

            <Button
                type="submit"
                className="mt-6 w-full bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-lg"
                size="lg"
                disabled={processing}
            >
                {processing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
        </div>
    );
}
