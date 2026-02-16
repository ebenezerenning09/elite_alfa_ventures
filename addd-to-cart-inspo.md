#this file was used for a diffrent project, it doesnt concern this project it is here to guide the llm see how it it done. not to inspire llm to add features unrelated to the current project

#take inspo but stick to your project requirement

import { create } from "zustand";

const useCartStore = create((set) => ({
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],

    setCartItems: (items) => {
        localStorage.setItem("cart", JSON.stringify(items));
        set({ cartItems: items });
    },

    addToCart: (item) =>
        set((state) => {
            const updated = [...state.cartItems, item];
            localStorage.setItem("cart", JSON.stringify(updated));
            return { cartItems: updated };
        }),

    removeFromCart: (id) =>
        set((state) => {
            const updated = state.cartItems.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            return { cartItems: updated };
        }),

    clearCart: () =>
        set(() => {
            localStorage.removeItem("cart");
            return { cartItems: [] };
        }),
}));

export default useCartStore;
