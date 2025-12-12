import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            role: null, // 'client' or 'admin'

            login: (userData, token, role) => {
                set({ user: userData, token, role });
            },

            logout: () => {
                set({ user: null, token: null, role: null });
            },

            isAuthenticated: () => {
                const state = useAuthStore.getState();
                return !!state.token;
            },

            isAdmin: () => {
                const state = useAuthStore.getState();
                return state.role === 'admin';
            },

            isClient: () => {
                const state = useAuthStore.getState();
                return state.role === 'client';
            }
        }),
        {
            name: 'auth-storage'
        }
    )
);
