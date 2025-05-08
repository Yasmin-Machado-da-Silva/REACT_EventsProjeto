// import { Fragment } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
// import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
// import Lista from "../../components/lista/Lista";
import bannerFundoTE from "../../assets/img/bannerFundoTE.png"

const CadastroTipoEvento = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro Tipo de Evento"
                    placeholder="Titulo"
                    visibilidade="none"
                    bannerDefundo={bannerFundoTE}
                />
                {/* <Lista
                    tituloLista="Lista de Filmes"
                /> */}
            </main>
            {/* <Footer /> */}
        </>

    )
}

export default CadastroTipoEvento;