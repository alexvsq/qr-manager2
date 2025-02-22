import { create } from "zustand";
import { Config } from "@/types/types";
import { CONFIG_SCANNED_DEFAULT } from "@/utils/constants";

interface ConfigStateStore {
  configState: Config;
  setConfigState: (configState: Config) => void;
}

export const useConfigStore = create<ConfigStateStore>()((set) => ({
  configState: CONFIG_SCANNED_DEFAULT,
  setConfigState: (configState) => set((state) => ({ configState })),
}));
