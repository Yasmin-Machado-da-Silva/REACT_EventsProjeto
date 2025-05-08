// import { Fragment } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
// import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
// import Lista from "../../components/lista/Lista";
import bannerFundoTU from "../../assets/img/bannerFundoTU.png"

const CadastroTipoUsuario = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro Tipo de Usuário"
                    placeholder="Titulo"
                    visibilidade="none"
                    bannerDefundo={bannerFundoTU}
                />
                {/* <Lista
                    tituloLista="Lista de Filmes"
                /> */}
            </main>
            {/* <Footer /> */}
        </>

    )
}

export default CadastroTipoUsuario;