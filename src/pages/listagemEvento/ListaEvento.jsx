// import { Fragment } from "react";
import Lista from "../../components/lista/Lista";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


const Listagem = () => {
    return (
        <>
            <Header />
            <main>
                
                <Lista
                    tituloLista="Lista Tipo de Usuário"
             
                />
            </main>
            <Footer />
        </>

    )
}

export default Listagem;