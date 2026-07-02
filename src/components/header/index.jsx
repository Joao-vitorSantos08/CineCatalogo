import { Link } from "react-router-dom"
import "./header.css"
import perfil from "../../assets/image/imagemDePerfil.png"
import { auth } from "../../service/firebase"
import { signOut } from "firebase/auth"

const Header = () => {

    
    const logout = async() => {
        await signOut(auth)
        
    }

    return (
        <header>
            <Link className="logo" to={"/"}>CineCatálogo</Link>
            <div className="container">
                <Link className="link" to={"/favorito"}>Meus favoritos</Link>
                <div className="perfil">
                    <img src={perfil} alt="" />
                    <div className="menu">
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header