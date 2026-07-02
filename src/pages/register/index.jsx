import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "../../service/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {


    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (email === "" && password === "") {
            alert("Preemcha todos os campos")
        }
        await createUserWithEmailAndPassword(auth, email, password)
        alert("Usuário cadastrado")
        navigate("/home")

        setEmail("")
        setPassword("")


    }

    return (
        <div className="login-container">
            <h1>Cadastra-se</h1>
            <span>Vamos criar sua conta!</span>

            <form className="form" onSubmit={handleRegister}>
                <input value={email} type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)} />

                <input value={password} type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Cadastrar</button>

            </form>
            <Link className="register" to="/">Já possui sua conta? faça Login</Link>
        </div>
    )
}

export default Register