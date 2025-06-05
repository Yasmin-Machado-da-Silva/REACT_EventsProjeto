import { useEffect, useState } from "react";
import excluir_coment from "../../assets/icons/excluirComentIcon.png"
import api from "../../services/services"

const Modal = (props) => {

    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState ("");
    const [usuarioId, setUsuarioId] = useState("AB46FD86-2DD9-4B69-8D33-43B9433E7EB1");

    async function listarComentarios() {
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`)

            setComentarios(resposta.data)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        listarComentarios();
    },[comentarios] );

    async function cadastrarComentario() {
        try {
            await api.post("ComentariosEventos",{
                idUsuario: usuarioId,
                idEvento: props.idEvento,
                descricao: comentarios
            })
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    async function deletarComentario() {
        try {
            await api.delete(`ComentariosEventos/${idComentarios}`)
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={excluir_coment} alt="Deletar" onClick={() => deletarComentario(item.idComentarioEvento)} />
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input type="text" placeholder="Escreva seu comentário" 
                                value={novoComentario}
                                onChange={(e)=>setNovoComentario(e.target.value)}/>
                                <button onClick={() => cadastrarComentario(novoComentario)}>
                                    cadastrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;


