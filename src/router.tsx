import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './views/IndexPage'
import FavouritesPage from './views/FavouritesPage'
import Layout from './layouts/Layout'
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/" element={<IndexPage />} index />
                    <Route path="/favoritos" element={<FavouritesPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}
