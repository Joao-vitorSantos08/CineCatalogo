import "./filme.css"
import { useState, useEffect } from "react"
import Api from "../../service/api"
import { useParams } from "react-router-dom"

const Detalhes = () => {

    const { id } = useParams()
    const [filme, setFilmes] = useState({})

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
        
        if(verifivarFilme){
            alert("Ess filme Já foi salvo")
            return
        }

        filmesSalvos.push(filme)
        
        localStorage.setItem("@cinecatalogo", JSON.stringify(filmesSalvos))
        alert("filme Salvo com Sucesso")
        

    }



    return (
        <main className="container">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} title={filme.title} />

            <div className="filme-info">

                <p>{filme.overview}</p>
                <span>Avaliação: {filme.vote_average
                } / 10</span>

                <div className="buttons">
                    <button onClick={salvar}>Salvar</button>
                    <a target="black" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </div>

            </div>
        </main>
    )
}

export default Detalhes