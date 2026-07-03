import "./favoritos.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { DB } from "../../service/firebase"
import { collection, query, where, doc, deleteDoc, onSnapshot } from "firebase/firestore"

const Favoritos = () => {

    const [filmes, setFilmes] = useState([])


    useEffect(() => {
        const verificar = async () => {
            const user = JSON.parse(localStorage.getItem("@detailUser"));
            const consulta = query(collection(DB, "Coleção do usuário"),
                where("uid", "==", user.uid)
            )

            const filmes = await onSnapshot(consulta, (snapshot) => {
                const lista = []
                snapshot.forEach((doc) => {
                    lista.push({
                        idDoc: doc.id,
                        ...doc.data()
                    })
                })

                setFilmes(lista)
                console.log(lista)
            })
            return filmes;

        }

        verificar()

    }, [])

    const remover = async (idDoc) => {
        const docRef = doc(DB, "Coleção do usuário", idDoc)
        await deleteDoc(docRef)
        toast.success("Filme Removido com sucesso")
    }

    return (
        <main>
            <h1>{filmes != "" ? "" : "Sua lista está vazia. Que tal adicionar alguns filmes?"} </h1>

            <ul className="card-filme">
                {filmes.map((filme) => (
                    <li key={filme.id}>

                        <img className="main-img" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} title={filme.titulo} />

                        <div className="info">
                            <p>{filme.titulo} </p>
                            <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                            <button onClick={() => remover(filme.idDoc)}>Remover</button>
                        </div>

                    </li>

                ))}
            </ul>
        </main>
    )
}

export default Favoritos