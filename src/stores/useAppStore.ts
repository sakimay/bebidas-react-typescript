import { create } from "zustand";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { FavouritesSliceType, createFavouritesSlice } from "./favouritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

export const useAppStore = create<RecipiesSliceType & FavouritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavouritesSlice(...a),
    ...createNotificationSlice(...a)
})));