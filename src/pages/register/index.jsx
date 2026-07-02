import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "../../service/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {


    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [erropassword, setErroPassword] = useState("")


    const handleRegister = async (e) => {
        e.preventDefault()
        if (email === "" && password === "") {
            alert("Preemcha todos os campos")
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert("Usuário cadastrado")
            navigate("/home")

            setEmail("")
            setPassword("")
        } catch (error) {
            if (password.length < 6) {
                setErroPassword("Senha muito curta. A senha deve ter pelo menos 6 dígitos")
                console.log(error)
            }
        }


    }

    return (
        <div className="login-container">
            <h1>Cadastra-se</h1>
            <span>Vamos criar sua conta!</span>

            <form className="form" onSubmit={handleRegister}>
                <input value={email} type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)} />

                <input value={password} type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                {erropassword && (
                    <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {erropassword}
                    </span>
                )}
                <button type="submit">Cadastrar</button>

            </form>
            <Link className="register" to="/">Já possui sua conta? faça Login</Link>
        </div>
    )
}

export default Register