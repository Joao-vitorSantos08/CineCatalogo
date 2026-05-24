import "./favoritos.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Favoritos = () => {

    const [filmes, setFilmes] = useState([])



    useEffect(() => {
        const minhalista = localStorage.getItem("@cinecatalogo")
        setFilmes(JSON.parse(minhalista) || [])

    }, [])

    const remover = (id) => {
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@cinecatalogo", JSON.stringify(filtroFilmes))
        toast.success("Filme Removido com sucesso")
    }

    return (
        <main>
            <ul className="card-filme">
                {filmes.map((filme) => (
                    <li key={filme.id}>

                        <img className="main-img" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} title={filme.title} />

                        <div className="info">
                            <p>{filme.title} </p>
                            <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                            <button onClick={() => remover(filme.id)}>Remover</button>
                        </div>

                    </li>

                ))}
            </ul>

        </main>
    )
}

export default Favoritos