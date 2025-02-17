import { create } from "zustand";
import { ScannedHistoryData } from "@/types/types";

interface ScannedListHistoryState {
  ScannedListHistory: ScannedHistoryData[] | null;
  SetScannedListHistory: (
    ScannedListHistory: ScannedHistoryData[] | null
  ) => void;
}

export const useScannedListHistoryStore = create<ScannedListHistoryState>()(
  (set) => ({
    ScannedListHistory: null,
    SetScannedListHistory: (ScannedListHistory) =>
      set((state) => ({ ScannedListHistory })),
  })
);
