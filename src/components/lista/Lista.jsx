import "./Lista.css";
import Editar from "../../assets/icons/editarIcon.png"
import Excluir from "../../assets/icons/excluirIcon.png"

const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />

            <div className="tabela">
                <table>
                    {/*cabeçalho da tabela: */}
                    <thead>
                        {/* tr = table row*/}
                        <tr className="table_cabecalho">
                            <th>Titulo</th>
                            <th style={{display:props.visiGenero}}>TipoEvento</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/*tbody => corpo da tabela*/}
                    <tbody>
                        <tr className="item_lista">
                            <td data-cell="Titulo">Harry Potter e a Pedra Filosofal</td>
                            <td data-cell="TipoEvento" style={{display:props.visiEvento}}>Ação</td>
                            <td data-cell="Editar"><img src={Editar} alt="Caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Lixo" /></td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;