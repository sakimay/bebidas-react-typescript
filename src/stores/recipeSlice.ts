import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipies } from "../services/RecipieService"
import type { Categories, Drink, Drinks, Recipie, SearchFilter } from "../types"


export type RecipiesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipie: Recipie
    fetchCategories: () => Promise<void>
    searchRecipies: (SearchFilters: SearchFilter) => Promise<void>
    selectRecipie: (id: Drink['idDrink']) => Promise<void>
}

export const createRecipiesSlice: StateCreator<RecipiesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipie: {} as Recipie,
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
            selectedRecipie
        })
    }
})