import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "../../service/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [erroUsuario, setErroUsuario] = useState("")

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            alert("Preecha todos os campo")
            return
        }
        try {

            await signInWithEmailAndPassword(auth, email, password)
            navigate("/home")
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErroUsuario("Senha inválida ou usuário incorreto.");
            }

        }

    }

    return (
        <div>
            <div className="login-container">
                <h1>CineCatalogo</h1>
                <span>Seu catálogo de filmes favorito em um só lugar.</span>

                <form className="form" onSubmit={login}>
                    <input value={email} type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)} />

                    <input value={password} type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                    {erroUsuario && (
                        <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                            {erroUsuario}
                        </span>
                    )}

                    <button type="submit">Entrar</button>

                </form>

                <Link className="register" to="/register">Não possui uma conta? Cadastra-se</Link>
            </div>
        </div>
    )
}


export default Login