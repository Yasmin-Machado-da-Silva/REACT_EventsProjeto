// Importação
import { useState } from "react";
import { userDecodeToken } from "../../auth/Auth";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/img/logoEvents.svg"
import api from "../../services/services"
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import "./Login.css"
// import {Link} from "react-router-dom";

const Login = () => {

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

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const { setUsuario } = useAuth();

  async function realizarAutenticacao(e) {

    e.preventDefault();
    // console.log(email, senha);
    const usuario = {
      email: email,
      senha: senha
    }

    if (senha.trim() != "" || email.trim() != "") {
      try {
        const resposta = await api.post("Login", usuario);

        const token = resposta.data.token;

        if (token) {
          //token sera decodificado:
          const tokenDecodificado = userDecodeToken(token);
          // console.log("Token decodificado:");
          // console.log(tokenDecodificado.tipoUsuario);

          setUsuario(tokenDecodificado);

          secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

          // console.log("O tipo de usuario é:");
          // console.log(tokenDecodificado.tipoUsuario);

          if (tokenDecodificado.tipoUsuario === "Aluno") {
            //redirecionar a tela de lista de eventos(branca)
            navigate("/lista")
          } else {
            //ele vai me encaminhar pra tela cadastro de eventos(vermelha)
            navigate("/evento")
          }

        }

      } catch (error) {
        console.log(error);
        alertar("error", "EMAIL ou senha inválidos, para dúvidas entre em contato com o suporte. 🤖")
      }
    } else {
      alertar("warning", "Preencha os campos vazios para realizar o login 🤖")
    }

  }

  return (
    <main className="main_login">
      <div className="banner"></div>
      <section className="section_login">
        <img src={Logo} alt="Logo do Events" />
        <form action="" className="form_login" onSubmit={realizarAutenticacao}>
          {/* <h1>Login</h1> */}
          <div className="campos_login">
            <div className="campo_input">
              {/* <label htmlFor="email">Email: </label> */}
              <input type="email" name="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="campo_input">
              {/* <label htmlFor="senha">Senha:</label> */}
              <input type="password" name="senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} />

              {/* <Link to="/">fdfdfdsfdsfdsfsdf</Link> */}
            </div >
            <a className="senhaEsquecida_Link" href="/"> Esqueceu a senha? </a>
          </div>
          <Botao nomeDoBotao="Login" />
        </form>
      </section>
    </main>

  )
}

export default Login;