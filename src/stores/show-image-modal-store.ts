import { create } from "zustand";

type ShowImageModalStore = {
  imageUrl: string | null;
  openModal: (imageUrl: string) => void;
  closeModal: () => void;
};

export const useShowImageModalStore = create<ShowImageModalStore>((set) => ({
  imageUrl: null,
  openModal: (imageUrl) => set({ imageUrl }),
  closeModal: () => set({ imageUrl: null }),
}));
