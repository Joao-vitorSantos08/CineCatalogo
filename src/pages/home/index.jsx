import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Api from "../../service/api"
import "./home.css"


const Home = () => {

    const [filmes, setFilmes] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmes() {
            const response = await Api.get("/movie/now_playing", {
                params: {
                    api_key: import.meta.env.VITE_API_KEY,
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(response.data.results)
            setLoading(false)
        }

        loadFilmes()

    }, [])

    const formatReleaseDate = (dateString) => {
        if (!dateString) return '';
        const dateObj = new Date(dateString + 'T00:00:00');

        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(dateObj);
    };

    return (

        <main className="filmes">

            {filmes.map((filme) => (
                <article key={filme.id}>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} title={filme.title} />
                    <h1>{filme.title}</h1>
                      <p className="data">{formatReleaseDate(filme.release_date)}</p>
                    <Link className="btn" to={`/filme/${filme.id}`}> Ver detalhes</Link>
                </article>

            ))}
            <p className="loading">{loading === true ? "Carregando..." : ""}</p>
        </main>



    )
}

export default Home