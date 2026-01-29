import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const favorites = get().favorites;
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((item) => item !== id)
            : [...favorites, id],
        });
      },
    }),
    {
      name: "favorites",
    },
  ),
);
