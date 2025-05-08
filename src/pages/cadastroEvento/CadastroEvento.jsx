// import { Fragment } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
// import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista";
import bannerFundoCE from "../../assets/img/bannerFundoCE.png"

const CadastroEvento = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Evento"
                    placeholder="Nome"
                    bannerDefundo={bannerFundoCE}
                    select="Tipo Evento"
                />
                <Lista
                    tituloLista="Lista de Evento"
                />
            </main>
            {/* <Footer /> */}
        </>

    )
}

export default CadastroEvento;