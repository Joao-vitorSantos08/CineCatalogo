import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Detalhes from "./pages/filme"
import Header from "./components/header"

const RoutApp = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Detalhes />} />

            </Routes>
        </BrowserRouter>
    )
}

export default RoutApp