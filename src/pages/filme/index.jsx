import "./filme.css"
import { useState, useEffect } from "react"
import Api from "../../service/api"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { DB } from "../../service/firebase"
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"

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


    const salvar = async () => {
        const user = JSON.parse(localStorage.getItem("@detailUser"));
        const consulta = query(
            collection(DB, "Coleção do usuário"),
            where("uid", "==", user.uid),
            where("id", "==", filme.id)
        );

        const snapshot = await getDocs(consulta);

        if (!snapshot.empty) {
            toast.warn("Esse filme já foi salvo.");
            return;
        }
        try {
            await addDoc(collection(DB, "Coleção do usuário"), {
                uid: user.uid,
                email: user.email,
                titulo: filme.title,
                poster_path: filme.poster_path,
                id: filme.id
            })
            toast.success("filme Salvo com Sucesso")
        } catch (error) {
            console.log(error)
        }

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