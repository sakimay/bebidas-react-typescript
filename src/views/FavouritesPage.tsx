import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavouritesPage() {
    const favourites = useAppStore((state) => state.favourites)
    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10">
                {favourites.map((recipie) => (
                    <DrinkCard key={recipie.idDrink} drink={recipie} />
                ))}
            </div>
        </>
    )
}
