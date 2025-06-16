import { create } from 'zustand';

export const useUIStore = create<{
  popupMessage: string | null;
  popupType: 'combo' | 'tetris' | null;
  showPopup: (msg: string, type: 'combo' | 'tetris') => void;
  hidePopup: () => void;
}>((set) => ({
  popupMessage: null,
  popupType: null,
  showPopup: (msg, type) => set({ popupMessage: msg, popupType: type }),
  hidePopup: () => set({ popupMessage: null, popupType: null }),
}));