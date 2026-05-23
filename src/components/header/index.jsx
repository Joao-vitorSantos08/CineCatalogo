import "./header.css"
import { Link } from "react-router-dom"

const Header = () => {
    return(
            <header>
                <h1>CIneCatálogo</h1>
                <Link className="link" to={"/favorito"}>Meus favoritos</Link>
            </header>
    )
}

export default Header