import { EcommerceNav } from '@/components/ecommerce-nav';
import { EcommerceFooter } from '@/components/ecommerce-footer';
import useCartStore from '@/stores/cart-store';
import ToastProvider from '@/components/toast-provider';

export default function EcommerceLayout({ children }) {
    const cartItems = useCartStore((state) => state.cartItems);

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[var(--color-off-white)] flex flex-col">
                <EcommerceNav cartCount={cartItems.length} />
                <div className="flex-1">
                    {children}
                </div>
                <EcommerceFooter />
            </div>
        </ToastProvider>
    );
}
