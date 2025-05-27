import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastro} className="layout_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>

                <div className="campos_cadastro">
                    <div>
                        <img className="imagem_tipoEvento" src={props.bannerDefundo} alt="imagem fundo tela de tipo evento" />
                    </div>
                    <div className="campos_cad_titulo">
                        <input type="text" name="titulo" placeholder={props.placeholder}

                            value={props.inputValor}
                            //Ao mudar o input acontece alguma coisa
                            //target serve para identificar o elemento que disparou o evento (e)
                            onChange={(e) => props.setValorInput(e.target.value)}
                        />
                        <input
                            style={{ display: props.visiDate }}
                            type="date"
                            name="dataEvento"
                            className="input_data_evento"
                            value={props.dataEvento}
                            onChange={(e) => props.setDataEvento(e.target.value)}
                        />
                        <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                            {/* Select de Tipo Evento */}
                            <select
                                name="tipoEvento"
                                value={props.selectTipoEvento}
                                onChange={(e) => props.setSelectTipoEvento(e.target.value)}
                            >
                                <option value="" disabled selected>Tipo Evento</option>
                                {props.listaTipoEvento?.map((tipo) => (
                                    <option key={tipo.idTipoEvento} value={tipo.idTipoEvento}>
                                        {tipo.tituloTipoEvento}
                                    </option>
                                ))}
                            </select>

                            {/* Select de Instituição */}
                            <select
                                name="instituicao"
                                value={props.selectInstituicao}
                                onChange={(e) => props.setSelectInstituicao(e.target.value)}
                            >
                                <option value="" disabled selected>Instituição</option>
                                {props.listaInstituicao?.map((inst) => (
                                    <option key={inst.idInstituicao} value={inst.idInstituicao}>
                                        {inst.nomeFantasia}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                name="descricao"
                                placeholder="Descrição do Evento"
                                value={props.descricao}
                                onChange={(e) => props.setDescricao(e.target.value)}
                            />
                        </div>
                        <Botao nomeDoBotao="Cadastrar" />
                    </div>


                </div>
            </form>
        </section>
    )
}

export default Cadastro;