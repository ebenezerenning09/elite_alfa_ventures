import { create } from 'zustand';

const useCartStore = create((set) => {
    // Initialize from localStorage if available
    const getInitialCart = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    };

    return {
        cartItems: getInitialCart(),

        setCartItems: (items) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(items));
            }
            set({ cartItems: items });
        },

        addToCart: (item) =>
            set((state) => {
                // Check if product already exists in cart
                const existingIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);
                
                let updated;
                if (existingIndex >= 0) {
                    // Update quantity if product already exists
                    updated = state.cartItems.map((cartItem, index) =>
                        index === existingIndex
                            ? { ...cartItem, quantity: (cartItem.quantity || 1) + (item.quantity || 1) }
                            : cartItem
                    );
                } else {
                    // Add new item with cartId
                    updated = [...state.cartItems, { ...item, cartId: Date.now() }];
                }
                
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cart', JSON.stringify(updated));
                }
                return { cartItems: updated };
            }),

        removeFromCart: (cartId) =>
            set((state) => {
                const updated = state.cartItems.filter((item) => item.cartId !== cartId);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cart', JSON.stringify(updated));
                }
                return { cartItems: updated };
            }),

        updateQuantity: (cartId, quantity) =>
            set((state) => {
                const updated = state.cartItems.map((item) =>
                    item.cartId === cartId ? { ...item, quantity } : item
                );
                if (typeof window !== 'undefined') {
                    localStorage.setItem('cart', JSON.stringify(updated));
                }
                return { cartItems: updated };
            }),

        clearCart: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
            set({ cartItems: [] });
        },

        getCartCount: () => {
            const state = useCartStore.getState();
            return state.cartItems.length;
        },
    };
});

export default useCartStore;
