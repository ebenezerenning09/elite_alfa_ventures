import { EcommerceNav } from '@/components/ecommerce-nav';
import useCartStore from '@/stores/cart-store';
import ToastProvider from '@/components/toast-provider';

export default function EcommerceLayout({ children }) {
    const cartItems = useCartStore((state) => state.cartItems);

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[var(--color-off-white)]">
                <EcommerceNav cartCount={cartItems.length} />
                {children}
            </div>
        </ToastProvider>
    );
}
