import { create } from "zustand";

interface uploadModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const uploadModal = create<uploadModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default uploadModal;