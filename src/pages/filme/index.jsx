import { useState, useEffect } from "react"
import Api from "../../service/api"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import "./filme.css"


const Detalhes = () => {

    const { id } = useParams()
    const [filme, setFilmes] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadfilme() {
            await Api.get(`/movie/${id}`, {
                params: {
                    api_key: import.meta.env.VITE_API_KEY,
                    language: "pt-BR",

                }
            })
                .then((res) => {
                    setFilmes(res.data)
                    console.log(res.data)
                    setLoading(false)
                })
        }

        loadfilme()

    }, [id])


    const salvar = () => {

        const minhaLista = localStorage.getItem("@cinecatalogo")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const verifivarFilme = filmesSalvos.some(
            (filmeSalvo) => filmeSalvo.id === filme.id
        )

        if (verifivarFilme) {
            toast.warn("Ess filme Já foi salvo")
            return
        }

        filmesSalvos.push(filme)

        localStorage.setItem("@cinecatalogo", JSON.stringify(filmesSalvos))
        toast.success("filme Salvo com Sucesso")


    }



    return (
        <main>

            <div className="container">


                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} title={filme.title} />


                <div className="filme-info">
                    <h1><strong>{filme.title}</strong></h1>
                    <h2>Sinopse</h2>
                    <p>{filme.overview}</p>
                    <span>Avaliação: {(filme.vote_average || 0).toFixed(1)} / 10</span>
                    <div className="buttons">
                        <button onClick={salvar}>Salvar</button>
                        <a target="black" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>

                    </div>

                </div>
            </div>

            <p className="loading">{loading === true ? "Carregando..." : ""}</p>
        </main>
    )
}

export default Detalhes