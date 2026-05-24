import "./footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="footer">
            <Link to="/" className="footer-logo">CineCatálogo</Link>

            <p className="footer-text">
                © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
        </footer>
    )
}

export default Footer
