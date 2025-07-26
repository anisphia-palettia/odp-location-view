import { create } from "zustand";

type WhatsappGroupCreateStore = {
  targetChatId: string | null;
  setTargetChatId: (id: string | null) => void;
};

export const useWhatsappGroupCreateStore = create<WhatsappGroupCreateStore>((set) => ({
  targetChatId: null,
  setTargetChatId: (id) => set({ targetChatId: id }),
}));
