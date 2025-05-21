import { create } from 'zustand';
import { AuthContextI } from '~/src/types/auth/context';

export const useStore = create<AuthContextI>((set) => ({
  isAuthLoading: false,
  onLogout: () => set({ isAuthLoading: false }),
  onLogin: () => set({ isAuthLoading: false }),
  user: null,
  refresh: () => set({ isAuthLoading: false }),
}));
