import Desc from "../../assets/icons/descricaoIcon.png"
import Coment from "../../assets/icons/comentIcon.png"
import { useEffect, useState } from "react"
import api from "../../services/services"
import { format } from "date-fns"
import Modal from "../../components/modal/Modal"

const AlunoListagemEvento = () => {

    const [listaEventos, setListaEventos] = useState([]);

    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos")
            setListaEventos(resposta.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        listarEventos();
    }, [])


    return (
        <>
            {/* //Aqui vc vai chamar o header
        //Começando a listagem: */}
            <main className="main_lista_eventos layout-grid">
                <div className="titulo">
                    <h1>Eventos</h1>
                    <hr />
                </div>
                <select name="" id="">
                    <option value="" selected>Todos os eventos</option>
                </select>
                <table className="tabela_lista_eventos">
                    <thead>
                        <tr className="th_lista_eventos">
                            <th>Titulo</th>
                            <th>Data Evento</th>
                            <th>Comentarios</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaEventos.length > 0 ? (
                            listaEventos.map((item) => (
                                <tr>
                                    <td>{item.nomeEvento}</td>
                                    <td>{format(item.dataEvento, "dd/MM//yy")}</td>
                                    <td>{item.TiposEventos.tituloTipoEvento}</td>

                                    <td
                                        data-cell="Descrição">

                                        <img src={Desc}
                                            alt="Balão de descrição"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </td>
                                    <td
                                        data-cell="Comentario">

                                        <img src={Coment}
                                            alt="Balão de comentário"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </td>
                                    <td>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Não tem nenhum evento cadastrado</p>
                        )
                        }

                    </tbody>
                </table>
            </main>

        {/* //Aqui vc vai chamar o footer */}

            <Modal/>
        </>
    )
}

export default AlunoListagemEvento;