import axios from 'axios'
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../utils/recipies-schema'
import { Drink, SearchFilter } from '../types'

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios.get(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
    throw new Error(
        `Error al obtener las categorias: ${result.error.message}`
    )
}

export async function getRecipies(filters: SearchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios.get(url)
    
    const result = DrinksAPIResponse.safeParse(data)
    if (result.success) {
        return result.data
    }
    throw new Error(
        `Error al obtener las recetas: ${result.error.message}`
    )       
    
}
export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios.get(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if (result.success) {
        return result.data
    }
    throw new Error(
        `Error al obtener la receta: ${result.error.message}`
    )
}