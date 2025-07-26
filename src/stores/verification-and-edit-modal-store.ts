import { CoordinateUpdateItem } from "@/types/coordinate";
import { create } from "zustand";

type VerificationAndEditModalStore = {
  imageUrl: string | null;
  data: CoordinateUpdateItem | null;
  openModal: (imageUrl: string, data: CoordinateUpdateItem) => void;
  closeModal: () => void;
};

export const useVerificationAndEditModalStore =
  create<VerificationAndEditModalStore>((set) => ({
    imageUrl: null,
    data: null,
    openModal: (imageUrl, data) => set({ imageUrl, data }),
    closeModal: () => set({ imageUrl: null, data: null }),
  }));
