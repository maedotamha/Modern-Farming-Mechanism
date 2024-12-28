import { create } from "zustand";

interface GlobalConfig {
  idealMoistureA: number;
  idealMoistureB: number;
  cropNameA: string;
  cropNameB: string;
  location: string;
  soilTypeA: string;
  soilTypeB: string;
  altitudeA: number;
  altitudeB: number;
  cropTypeA: string;
  cropTypeB: string;
  updateConfig: (updates: Partial<GlobalConfig>) => void;
}

export const useGlobalConfig = create<GlobalConfig>((set) => ({
  idealMoistureA: 60,
  idealMoistureB: 70,
  cropNameA: "",
  cropNameB: "",
  location: "",
  soilTypeA: "",
  soilTypeB: "",
  altitudeA: 0,
  altitudeB: 0,
  cropTypeA: "",
  cropTypeB: "",
  updateConfig: (updates) => set((state) => ({ ...state, ...updates })),
}));

export const updateGlobalConfig = (updates: Partial<GlobalConfig>) => {
  useGlobalConfig.getState().updateConfig(updates);
};
