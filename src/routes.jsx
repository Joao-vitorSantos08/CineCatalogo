import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Detalhes from "./pages/filme"
import Header from "./components/header"
import Favoritos from "./pages/favoritos"
import Footer from "./components/footer"

const RoutApp = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Detalhes />} />
                <Route path="/favorito" element={ <Favoritos/>} />

            </Routes>
           <Footer/>
        </BrowserRouter>
    )
}

export default RoutApp