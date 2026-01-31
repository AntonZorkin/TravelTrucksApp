import { create } from "zustand";
import { FilterProps } from "@/types/trucks";

interface FiltersState {
  filters: FilterProps;
  setFilters: (filters: FilterProps) => void;
  resetFilters: () => void;
}

const initialFilters: FilterProps = {
  location: "",
  equipment: [],
  type: null,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: initialFilters }),
}));