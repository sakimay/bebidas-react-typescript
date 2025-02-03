import { create } from "zustand";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { FavouritesSliceType, createFavouritesSlice } from "./favouritesSlice";

export const useAppStore = create<RecipiesSliceType & FavouritesSliceType>()(devtools((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavouritesSlice(...a),
})));