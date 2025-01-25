import { useMemo } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function Header() {
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    console.log(isHome);

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
                    <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="text-white block uppercase font-extrabold text-lg"
                            >Nombre o Ingredientes</label>
                            <input
                                id="ingredient"
                                type="ingredient"
                                className="bg-white p-3 w-full rounded-lg focus:outline-hidden"
                                placeholder="Vodka, tequila, café..."
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
                            >
                                <option value="">-- Seleccionar --</option>
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
