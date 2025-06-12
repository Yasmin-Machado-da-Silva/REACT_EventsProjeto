import "./Lista.css";
import Editar from "../../assets/icons/editarIcon.png"
import Excluir from "../../assets/icons/excluirIcon.png"

const Lista = (props) => {
    return (
        <section className="listagem">
            <div className="layout_grid">
                <h1>{props.tituloLista}</h1>

                <div className="tabela">
                    <table>
                        {/*cabeçalho da tabela: */}
                        <thead>
                            {/* tr = table row*/}
                            <tr className="table_cabecalho">
                                <th>Titulo</th>
                                <th >{props.tipoDeTitulo}</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        {/*tbody => corpo da tabela*/}
                        <tbody>
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map((item) => (
                                    <tr className="item_lista" key={props.tipoLista === "TiposUsuarios"
                                        ? item.idTipoUsuario
                                        : item.idTipoEvento}
                                    >
                                        <td data-cell="Titulo">
                                            {props.tipoLista === "TiposUsuarios"
                                                ? item.tituloTipoUsuario
                                                : item.tituloTipoEvento}
                                            {/* {props.tipoLista === "TiposUsuarios" ? item.tituloTipoUsuario : item.titulo} */}
                                        </td>
                                        <td data-cell="TipoEvento"
                                            style={{ display: props.visiEvento }}>
                                            {item.TiposUsuarios?.nome}
                                        </td>
                                        <td
                                            onClick={() => (props.funcEditar(item))}
                                            data-cell="Editar"
                                        >
                                            <img src={Editar}
                                                alt="Caneta"
                                                style={{ cursor: "pointer" }} />
                                        </td>
                                        <td
                                            onClick={() => (props.funcExcluir(item))}
                                            data-cell="Excluir"
                                        >
                                            <img src={Excluir}
                                                alt="Lixeira"
                                                style={{ cursor: "pointer" }} />
                                        </td>
                                    </tr>
                                ))
                            ) :
                                (
                                    <tr>Nenhum tipo de usuario foi encontrado!</tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Lista;