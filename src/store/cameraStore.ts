import { create } from "zustand";

interface CameraState {
  facing: "back" | "front";
  flash: boolean;
  toggleFacing: () => void;
  toggleFlash: () => void;
}

export const useCameraStore = create<CameraState>()((set) => ({
  facing: "back",
  flash: false,
  toggleFacing: () =>
    set((state) => ({ facing: state.facing === "back" ? "front" : "back" })),
  toggleFlash: () => set((state) => ({ flash: !state.flash })),
}));
