import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/services"
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista";
import bannerFundoTU from "../../assets/img/bannerFundoTU.png"


const CadastroTipoUsuario = () => {

    const [TiposUsuarios, setTipoUsuario] = useState("");
    const [listaTU, setListaTU] = useState([])

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

    async function cadastrarTU(evt) {
        evt.preventDefault();
        //Verificar se o input esta vindo vazio
        if (TiposUsuarios.trim() !== "") {
            // alert("O campo prescisa estar preenchido")
            try {
                //cadastrar um tipo usuario: post
                await api.post("TiposUsuarios", { tituloTipoUsuario: TiposUsuarios });
                alertar("success", "Cadastro realizado com sucesso! 🎉")
                setTipoUsuario()
                listarTU();
            } catch (error) {
                alertar("error", "ERRO: Entre em contato com o suporte! 🤖")
                console.log(error);
            }
        } else {


        }

        //try => tentar (O esperado)
        //catch => lança a exceção
    }

    async function listarTU() {
        try {
            //await -> Aguarde ter uma resposta da solitação
            const resposta = await api.get("TiposUsuarios");
            setListaTU(resposta.data)
            // console.log(resposta.data)

        } catch (error) {
            console.log(error);
        }
    }

    async function deletarTipoUsuario(tipoUsuarioId) {

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
                    await api.delete(`TiposUsuarios/${tipoUsuarioId.idTipoUsuario}`);
                    alertar("success", "Tipo usuario deletado com sucesso! 💣")
                    swalWithBootstrapButtons.fire({
                        title: "Deletado!",
                        text: "O tipo usuario foi deletado.",
                        icon: "success"
                    });
                    setTipoUsuario()
                    listarTU();

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

    async function editarTU(idTipoUsuario) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: idTipoUsuario.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }

        });
        if (novoTipoUsuario) {
            try {
                await api.put(`TiposUsuarios/${idTipoUsuario.idTipoUsuario}`,
                    { tituloTipoUsuario: novoTipoUsuario })
                Swal.fire(`O tipo de usuario modificado é: ${novoTipoUsuario}`);

                setTipoUsuario()
                listarTU();

            } catch (error) {
                console.log(error);

            }
        }
    }

    useEffect(() => {
        listarTU();
    }, [])

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro Tipo de Usuário"
                    placeholder="Nome"
                    visibilidade="none"
                    visiDate="none"
                    bannerDefundo={bannerFundoTU}
                    funcCadastro={cadastrarTU}
                    setValorInput={setTipoUsuario}
                    inputValor={TiposUsuarios}

                />
                <Lista
                    tituloLista="Lista Tipo de Usuário"
                    lista={listaTU}
                    visiAlternativa="none"
                    visiComentario="none"
                    tipoLista="TiposUsuarios"
                    funcExcluir={deletarTipoUsuario}
                    tipoDeTitulo=" "
                    funcEditar={editarTU}



                />
            </main>
            <Footer />
        </>

    )
}

export default CadastroTipoUsuario;