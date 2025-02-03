import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipies } from "../services/RecipieService"
import type { Categories, Drink, Drinks, Recipie, SearchFilter } from "../types"
import { FavouritesSliceType } from "./favouritesSlice"


export type RecipiesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipie: Recipie
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipies: (SearchFilters: SearchFilter) => Promise<void>
    selectRecipie: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}
export const createRecipiesSlice: StateCreator<RecipiesSliceType & FavouritesSliceType, [], [], RecipiesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipie: {} as Recipie,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipies: async (filters) => {
        const drinks = await getRecipies(filters)
        set({
            drinks
        })
    },
    selectRecipie: async (id) => {
        const selectedRecipie = await getRecipeById(id)
        set({
            selectedRecipie,
            modal: true
        })
    },
    closeModal: () => {        
        set({
            modal: false,
            selectedRecipie: {} as Recipie
        })
    }
})