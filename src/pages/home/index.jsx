import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Api from "../../service/api"
import "./home.css"


const Home = () => {

    const [filmes, setFilmes] = useState([])

    const [loading, setLoading] = useState(true)

    const [pagina, setPagina] = useState(1)

    const [buscar, setBusca] = useState("")

    useEffect(() => {
        async function loadFilmes() {
            const response = await Api.get("/movie/now_playing", {
                params: {
                    api_key: import.meta.env.VITE_API_KEY,
                    language: "pt-BR",
                    page: pagina,
                }
            })
            setFilmes(response.data.results)
            setLoading(false)
        }

        loadFilmes()

    }, [pagina])

    const formatReleaseDate = (dateString) => {
        if (!dateString) return '';
        const dateObj = new Date(dateString + 'T00:00:00');

        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(dateObj);
    };

    const btn_more_movies = () => {
        setPagina(pagina + 1)
        console.log(pagina)

    }

    const filtrarFilme = filmes.filter((filme) =>
        filme.title
            .toLowerCase()
            .includes(buscar.toLowerCase()))




    return (

        <div>


            <input className="input" value={buscar} type="text"
                placeholder="Pesquisar filme" onChange={e => setBusca(e.target.value)} />


            <main className="filmes">

                {filtrarFilme.map((filme) => (
                    <article key={filme.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} title={filme.title} />
                        <div className="card-info">
                            <h1>{filme.title}</h1>
                            <p className="data">{formatReleaseDate(filme.release_date)}</p>
                            <Link className="btn" to={`/filme/${filme.id}`}> Ver detalhes</Link>
                        </div>
                    </article>

                ))}
                <p className="loading">{loading === true ? "Carregando..." : ""}</p>
                {filmes.length > 0 && (
                    <button onClick={btn_more_movies} className="btn-more-movies">
                        Carregar mais filmes
                    </button>
                )}
            </main>


        </div>

    )
}

export default Home