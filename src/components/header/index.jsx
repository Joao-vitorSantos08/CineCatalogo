import "./header.css"
import { Link } from "react-router-dom"

const Header = () => {
    return(
            <header>
                <Link className="logo" to={"/"}>CineCatálogo</Link>
                <Link className="link" to={"/favorito"}>Meus favoritos</Link>
            </header>
    )
}

export default Header