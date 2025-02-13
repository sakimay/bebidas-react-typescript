import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipies = useAppStore((state) => state.searchRecipies)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(searchFilters).includes('')) {
            showNotification({ text: 'Todos los campos son obligatorios', error: true })
            return
        }
        //consultar las recetas
        searchRecipies(searchFilters)
    }

    return (
        <header className={isHome
            ? "bg-header bg-center bg-cover"
            : "bg-slate-800"}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="./logo.svg" alt="" className="w-32" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}>

                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="text-white block uppercase font-extrabold text-lg"
                            >Nombre o Ingredientes</label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="bg-white p-3 w-full rounded-lg focus:outline-hidden"
                                placeholder="Vodka, tequila, café..."
                                value={searchFilters.ingredient}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="text-white block uppercase font-extrabold text-lg"
                            >Categoría</label>
                            <select
                                name="category"
                                id="category"
                                className="bg-white p-3 w-full rounded-lg focus:outline-hidden"
                                value={searchFilters.category}
                                onChange={handleChange}
                            >
                                <option value="">-- Seleccionar --</option>
                                {categories.drinks.map((category) => (
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Buscar Bebidas"
                            className="bg-orange-800 p-3 w-full rounded-lg uppercase font-extrabold text-lg hover:cursor-pointer text-white" />
                    </form>
                )}

            </div>
        </header>
    )
}
