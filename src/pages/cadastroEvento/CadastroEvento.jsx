// import { Fragment } from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/services"
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista";
import bannerFundoCE from "../../assets/img/bannerFundoCE.png"

const CadastroEvento = () => {

    const [evento, setEvento] = useState("");
    const [listaEvento, setListaEvento] = useState([])


    //PARTE DO ALERTA
    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }
    //FIM DA PARTE DO ALERTA

    // async function cadastrarEvento(e) {
    //     e.preventDefault();

    //     if (evento.trim() ! == ""){

    //         try{
    //             await api.post("Eventos", )
    //         }
    //     }
        
    // }

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
                    visiAlternativa="none"
                    visiComentario="none"
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;