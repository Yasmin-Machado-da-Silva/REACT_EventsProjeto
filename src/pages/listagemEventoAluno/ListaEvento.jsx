import Desc from "../../assets/icons/descricaoIcon.png"
import Coment from "../../assets/icons/comentIcon.png"
import { useEffect, useState } from "react"
import api from "../../services/services"
import { format } from "date-fns"
import Modal from "../../components/modal/Modal"
import Toggle from "../../components/toggle/Toggle.jsx"
import Swal from "sweetalert2"

const AlunoListagemEvento = () => {

    const [listaEventos, setListaEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState(""); //"descriçãoEvento" ou "Comentário"
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false)

    const [filtroData, setFiltroData] = useState(["todos"])

    const [usuarioId, setUsuarioId] = useState("AB46FD86-2DD9-4B69-8D33-43B9433E7EB1")

    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos")
            const todosOsEventos = resposta.data

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)

            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    //as informações tanto de evento quanto de de eventos que possuem presenca
                    ...atualEvento,//Mantém os dados originais do evento atual
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresenca || null
                }
            })

            setListaEventos(eventosComPresencas)
            // console.log(eventosComPresencas)

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        listarEventos();
    }, [])

    function abrirModal(tipo, dados) {
        //tipo de modal
        // dados
        setModalAberto(true)
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        console.log("aaaa")
        try {
            if (presenca && idPresenca !== "") {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false })
                // Atualização da situação para FALSE.
            } else if (idPresenca !== "") {
                // Atualização da situação para TRUE.
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true })
                Swal.fire(`Confirmado!`, `Sua presença foi confirmada.`, `success`);
            } else {
                // Cadastrar uma NOVA situação.
                await api.post(`PresencasEventos/${idPresenca}`, { situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire(`Confirmado!`, `Sua presença foi confirmada.`, `success`);
            }
            listarEventos()
        } catch (error) {
            console.log(error);
        }

    }
    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento)

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true
            if (filtroData.includes("passados") && dataEvento < hoje) return true

            return false
        })
    }

 
    return (
        <>
            {/* //Aqui vc vai chamar o header
        //Começando a listagem: */}
            <main className="main_lista_eventos layout-grid">
                <div className="titulo">
                    <h1>Eventos</h1>
                    <hr />
                </div>
                <select onChange={(e) => setFiltroData([e.target.value])}>
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
                            filtrarEventos() && filtrarEventos().map((item) => (
                                <tr>
                                    <td>{item.nomeEvento}</td>
                                    <td>{format(item.dataEvento, "dd/MM//yy")}</td>
                                    <td>{item.tiposEvento.tituloTipoEvento}</td>

                                    <td
                                        data-cell="Descrição">

                                        <img src={Desc}
                                            alt="Balão de descrição"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}
                                        />
                                    </td>
                                    <td
                                        data-cell="Comentario">

                                        <img src={Coment}
                                            alt="Balão de comentário"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => abrirModal("cometarios", { idEvento: item.idEvento })}
                                        />
                                    </td>

                                    <td data-cell="botao">

                                        <Toggle presenca={item.possuiPresenca}
                                            manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)} />

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

            {modalAberto && (

                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do evento" : "Comentário"}
                    //Estou verificando qual é o tipo do moda.
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}

                    descricao={dadosModal.descricao}

                    fecharModal={fecharModal}
                />

            )}
        </>
    )
}

export default AlunoListagemEvento;