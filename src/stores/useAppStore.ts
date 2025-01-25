import { create } from "zustand";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";

export const useAppStore = create<RecipiesSliceType>((...a) => ({
    ...createRecipiesSlice(...a),
}));