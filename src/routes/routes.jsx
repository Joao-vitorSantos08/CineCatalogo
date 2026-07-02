import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Detalhes from "../pages/filme";
import Favoritos from "../pages/favoritos";
import Register from "../pages/register";
import Login from "../pages/login";

import Private from "./private";
import Layout from "../layout";

const RoutApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route
                    path="/home" element={
                        <Private>
                            <Layout> <Home /> </Layout>
                        </Private>} />
                <Route
                    path="/filme/:id"
                    element={
                        <Private>
                            <Layout> <Detalhes /> </Layout>
                        </Private>} />
                <Route
                    path="/favorito" element={
                        <Private>
                            <Layout> <Favoritos /> </Layout>
                        </Private>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};

export default RoutApp;