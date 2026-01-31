import { create } from "zustand";
import { CamperListItem } from "@/types/trucks";
import { fetchCampers } from "@/lib/api";
import { useFiltersStore } from "@/store/filters";

const LIMIT = 4;

interface CampersState {
  trucks: CamperListItem[];
  page: number;
  total: number | null;
  loading: boolean;

  loadFirstPage: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useCampersStore = create<CampersState>((set, get) => ({
  trucks: [],
  page: 1,
  total: null,
  loading: false,

  loadFirstPage: async () => {
    set({ loading: true, trucks: [], page: 1, total: null });

    try {
      const { filters } = useFiltersStore.getState();

      const equipParams = Object.fromEntries(
        filters.equipment
          .filter((name) => name !== "Automatic")
          .map((name) => [name, true]),
      );

      const transmissionParam = filters.equipment.includes("Automatic")
        ? { transmission: "automatic" }
        : {};

      const params = {
        page: 1,
        limit: LIMIT,
        location: filters.location || undefined,
        form: filters.type || undefined,
        ...equipParams,
        ...transmissionParam,
      };

      const response = await fetchCampers(params);

      set({
        trucks: response.items,
        total: response.total,
      });
    } catch (err) {

    } finally {
      set({ loading: false });
    }
  },

  loadMore: async () => {
    const { loading, page, total, trucks } = get();
    if (loading) return;
    if (total !== null && trucks.length >= total) return;

    const nextPage = page + 1;
    set({ loading: true });

    try {
      const { filters } = useFiltersStore.getState();

      const equipParams = Object.fromEntries(
        filters.equipment
          .filter((name) => name !== "Automatic")
          .map((name) => [name, true]),
      );

      const transmissionParam = filters.equipment.includes("Automatic")
        ? { transmission: "automatic" }
        : {};

      const params = {
        page: nextPage,
        limit: LIMIT,
        location: filters.location || undefined,
        form: filters.type || undefined,
        ...equipParams,
        ...transmissionParam,
      };

      const response = await fetchCampers(params);

      set((state) => {
        const existing = new Set(state.trucks.map((t) => t.id));
        const merged = [
          ...state.trucks,
          ...response.items.filter((t) => !existing.has(t.id)),
        ];

        return {
          trucks: merged,
          page: nextPage,
          total: response.total,
        };
      });
    } catch (err) {

    } finally {
      set({ loading: false });
    }
  },
}));
