import { StateCreator } from "zustand";
import { Recipie } from "../types";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";

export type FavouritesSliceType = {
    favourites: Recipie[],
    handleClickFavourite: (recipie: Recipie) => void,
    favouriteExist: (id: Recipie['idDrink']) => boolean,
    loadFromLocalStorage: () => void
}

export const createFavouritesSlice: StateCreator<FavouritesSliceType & RecipiesSliceType, [], [], FavouritesSliceType> = (set, get, api) => ({
    favourites: [],
    handleClickFavourite: (recipie) => {
        if (get().favouriteExist(recipie.idDrink)) {
            set((state) => ({
                favourites: state.favourites.filter(favourite => favourite.idDrink !== recipie.idDrink)
            }))
        } else {
            set((state) => ({
                favourites: [...state.favourites, recipie]
            }))
        }
        createRecipiesSlice(set,get,api).closeModal()
        localStorage.setItem('favourites', JSON.stringify(get().favourites))
    },
    favouriteExist: (id) => {
        return get().favourites.some(favourite => favourite.idDrink === id)
    },
    loadFromLocalStorage: () => {
        const storedFavourites = localStorage.getItem('favourites')
        if (storedFavourites) {
            set({ favourites: JSON.parse(storedFavourites) })
        }
    }

})