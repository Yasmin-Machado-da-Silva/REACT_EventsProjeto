import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form action="" className="layout_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>

                <div className="campos_cadastro">
                    <div>
                        <img className="imagem_tipoEvento" src={props.bannerDefundo} alt="imagem fundo tela de tipo evento" />
                    </div>
                    <div className="campos_cad_titulo">
                        <input type="text" name="titulo" placeholder={props.placeholder} />

                        <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                            <select name="genero" id="">
                                <option value="" disabled selected>{props.select}</option>
                                <option value="">op1</option>
                                <option value="">op2</option>
                                <option value="">op3</option>
                            </select>
                        </div>
                        <Botao nomeDoBotao="Cadastrar" />
                    </div>


                </div>
            </form>
        </section>
    )
}

export default Cadastro;