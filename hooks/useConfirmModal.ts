import { create } from "zustand";
import {Song} from "@/types";

interface ConfirmModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  song: Song | null;
  setSong: (song: Song | null) => void;
}

export const useConfirmModal = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  song: null,
  setSong: (song) => set({ song }),
}));

export default useConfirmModal;