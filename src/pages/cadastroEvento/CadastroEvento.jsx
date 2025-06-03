// import { Fragment } from "react";
import { useState, useEffect} from "react";
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
    // criar um hook para listar os tipos de evento
    const [tiposEvento, setTiposEventos] = useState([])
    const [dataEvento, setDataEvento] = useState("")
    const [descricao, setDescricao] = useState("")
    const [idTipoEvento, setIdTipoEvento] = useState("")
    const [idInstituicao, setIdInstituicao] = useState("64F2672B-C6B0-4165-9F37-BD14360FB51F")


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

    // funcao para listar os tipos de eventos setar dentro do hook
    async function buscarEvento () {
        try {
            const resposta = await api.get("TiposEventos");
            setListaEvento(resposta.data)
            
        } catch (error) {
             console.log(error);
        }
    }

    useEffect(() =>{
        buscarEvento();
    }, [])


    async function cadastrarEventos(e) {
        e.preventDefault();

        if (evento.trim() !== "") {

            try {
                const resposta = await api.post("Eventos", {
                    nomeEvento: evento,
                    dataEvento: dataEvento,
                    descricao: descricao,
                    idTipoEvento: idTipoEvento,
                    idInstituicao: idInstituicao
                });
                console.log(resposta);
                
                alertar("success", "Cadastro realizado com sucesso! 🎉")
                setEvento();
                setTiposEventos();
                setListaEvento();
            } catch (error) {
                alertar("error", "ERRO: Entre em contato com o suporte! 🤖")
                console.log(error);
            }
        } else {

        }

    }

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Evento"
                    placeholder="Nome"
                    
                    bannerDefundo={bannerFundoCE}
                    funcCadastro={cadastrarEventos}
                    
                    setValorInput={setEvento}
                    inputValor={evento}
                    
                    setDescricao={setDescricao}
                    inputDescricao={descricao}

                    setSelectInstituicao={setIdInstituicao}
                    inputInstituicao={idInstituicao}
                    
                    setSelectTipoEvento={setIdTipoEvento}
                    inputTipoEvento={tiposEvento}
                    
                    dataEvento={setDataEvento}
                    setDataEvento={setDataEvento}

                    select="Tipo Evento"
            
                />
                <Lista
                    tituloLista="Lista de Evento"
                    visiAlternativa="none"
                    visiComentario="none"
                    visiDesc="none"
                    lista={listaEvento}

                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;