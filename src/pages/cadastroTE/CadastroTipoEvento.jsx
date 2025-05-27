import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/services"
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista";
import bannerFundoTE from '../../assets/img/bannerFundoTE.png';

const CadastroTipoEvento = () => {

    const [TiposEventos, setTipoEvento] = useState("");
    const [listaTE, setListaTE] = useState([])

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

    async function cadastrarTE(evt) {
        evt.preventDefault();
        //Verificar se o input esta vindo vazio
        if (TiposEventos.trim() !== "") {
            // alert("O campo prescisa estar preenchido")
            try {
                //cadastrar um tipo usuario: post
                await api.post("TiposEventos", { tituloTipoEvento: TiposEventos });
                alertar("success", "Cadastro realizado com sucesso! 🎉")
                setTipoEvento()
                listarTE();
            } catch (error) {
                alertar("error", "ERRO: Entre em contato com o suporte! 🤖")
                console.log(error);
            }
        } else {


        }

        //try => tentar (O esperado)
        //catch => lança a exceção
    }

    async function listarTE() {
        try {
            //await -> Aguarde ter uma resposta da solitação
            const resposta = await api.get("TiposEventos");
            setListaTE(resposta.data)
            // console.log(resposta.data)

        } catch (error) {
            console.log(error);
        }
    }

    async function deletarTipoEvento(tipoEventoId) {

        //COMEÇO DO ALERTA
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possivel reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //deletar um genero: delete
                    await api.delete(`TiposEventos/${tipoEventoId.idTipoEvento}`);
                    alertar("success", "Tipo de evento deletado com sucesso! 💣")
                    swalWithBootstrapButtons.fire({
                        title: "Deletado!",
                        text: "O tipo de evento foi deletado.",
                        icon: "success"
                    });
                    setTipoEvento()
                    listarTE();

                } catch (error) {
                    alertar("error", "ERRO: Entre em contato com o suporte! 🤖")
                    console.log(error);
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O tipo usuario não foi deletado",
                    icon: "error"
                });
            }
        });
    }

    async function editarTE(idTipoEvento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique seu tipo de evento",
            input: "text",
            inputLabel: "Novo tipo de evento",
            inputValue: idTipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }

        });
        if (novoTipoEvento) {
            try {
                await api.put(`TiposEventos/${idTipoEvento.idTipoEvento}`,
                    { tituloTipoEvento: novoTipoEvento })
                Swal.fire(`O tipo de usuario modificado é: ${novoTipoEvento}`);
               
                setTipoEvento()
                listarTE();

            } catch (error) {
                console.log(error);

            }
        }
    }

    useEffect(() => {
        listarTE();
    }, [])

    return (
        <>
            <Header />
            <main>
                <Cadastro
                
                    tituloCadastro="Cadastro Tipo de Evento"
                    placeholder="titulo"
                    visibilidade="none"
                    visiDate="none"
                    bannerDefundo={bannerFundoTE}
                    funcCadastro={cadastrarTE}
                    setValorInput={setTipoEvento}
                    inputValor={TiposEventos}

                />
                <Lista
                    tituloLista="Lista Tipo de Evento"
                    lista={listaTE}
                    visiAlternativa="none"
                    visiComentario="none"
                    tipoLista="TiposEventos"
                    funcExcluir={deletarTipoEvento}
                    tipoDeTitulo=" "
                    funcEditar={editarTE}
                />
            </main>
            <Footer />
        </>

    )
}

export default CadastroTipoEvento;