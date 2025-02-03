import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"
import { useMemo } from "react"

export default function FavouritesPage() {
    const favourites = useAppStore((state) => state.favourites)
    const hasFavourites = useMemo(() => favourites.length, [favourites])
    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>
            {hasFavourites ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10">
                {favourites.map((recipie) => (
                    <DrinkCard key={recipie.idDrink} drink={recipie} />
                ))}
            </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No hay favoritos, utiliza el formulario para buscar recetas
                </p>
            )}
        </>
    )
}
