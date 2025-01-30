import { create } from "zustand";

export const useMenuStore = create<{
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
}));
