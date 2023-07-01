import { create } from "zustand";

interface AvatarModalStore {
  isOpen: boolean;
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useAvatarModal = create<AvatarModalStore>((set) => ({
  isOpen: false,
  avatar: null,
  setAvatar: (avatar) => set({ avatar }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAvatarModal;