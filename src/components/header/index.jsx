import { Link } from "react-router-dom"
import "./header.css"

const Header = () => {
    return (
        <header>
            <Link className="logo" to={"/"}>CineCatálogo</Link>
            <Link className="link" to={"/favorito"}>Meus favoritos</Link>
        </header>
    )
}

export default Header