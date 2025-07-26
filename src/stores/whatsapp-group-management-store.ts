import { create } from "zustand";

type WhatsappGroupManagementStore = {
  groupId: number | null;
  setGroupId: (id: number | null) => void;
};

export const useWhatsappGroupManagementStore =
  create<WhatsappGroupManagementStore>((set) => ({
    groupId: null,
    setGroupId: (id) => set({ groupId: id }),
  }));
