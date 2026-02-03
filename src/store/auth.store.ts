import { create } from "zustand";
import storage from "@/utils/storage.util";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: storage.checkToken(),
  loading: false,

  setLoading: (loading) => set({ loading }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),

  logout: () => {
    storage.clearAuth();
    set({ isAuthenticated: false });
  },

  hydrate: () => {
    set({ isAuthenticated: storage.checkToken() });
  },
}));
