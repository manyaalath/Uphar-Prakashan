import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (book, quantity = 1) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === book.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === book.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    });
                } else {
                    set({
                        items: [...items, { ...book, quantity }]
                    });
                }
            },

            removeItem: (bookId) => {
                set({
                    items: get().items.filter(item => item.id !== bookId)
                });
            },

            updateQuantity: (bookId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(bookId);
                } else {
                    set({
                        items: get().items.map(item =>
                            item.id === bookId ? { ...item, quantity } : item
                        )
                    });
                }
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotal: () => {
                return get().items.reduce((total, item) => {
                    return total + (item.price * item.quantity);
                }, 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'cart-storage'
        }
    )
);
