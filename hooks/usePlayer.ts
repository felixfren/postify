import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
    shuffle: () => void;
    revertShuffle: () => void;
};

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id}),
    setIds: (ids: string[]) => set({ ids: ids}),
    reset: () => set({ ids: [], activeId: undefined}),
    shuffle: () => {
        set((state) => {
            const shuffledIds = [...state.ids];
            const currentIndex = state.ids.findIndex((id) => id === state.activeId);
            const currentSongId = shuffledIds.splice(currentIndex, 1)[0];
            for (let i = shuffledIds.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i+1));
                [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
            }
            shuffledIds.splice(currentIndex, 0, currentSongId);
            return { ids: shuffledIds, activeId: state.activeId};
        });
    },
    revertShuffle: () => {
        set((state) => {
            const originalOrder = state.ids.sort(); // Sort the IDs to revert to the original order
            originalOrder.reverse();
            return {
              ids: originalOrder,
              activeId: state.activeId,
            };
          });
    }
}));

export default usePlayer;