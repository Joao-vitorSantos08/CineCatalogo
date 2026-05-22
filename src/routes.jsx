import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Filme from "./pages/filme"

const RoutApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme />} />

            </Routes>
        </BrowserRouter>
    )
}

export default RoutApp