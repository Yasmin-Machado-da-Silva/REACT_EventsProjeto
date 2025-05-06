// Importação
import Logo from "../../assets/img/logoEvents.svg"
import Botao from "../../components/botao/Botao";
import "./Login.css"
// import {Link} from "react-router-dom";

const Login = () => {
  return (
    <main className="main_login">
      <div className="banner"></div>
      <section className="section_login">
        <img src={Logo} alt="Logo do Events" />
        <form action="" className="form_login">
          {/* <h1>Login</h1> */}
          <div className="campos_login">
            <div className="campo_input">
              {/* <label htmlFor="email">Email: </label> */}
              <input type="email" name="email" placeholder="Username"/>
            </div>
            <div className="campo_input">
              {/* <label htmlFor="senha">Senha:</label> */}
              <input type="password" name="senha" placeholder="Password"/>

            {/* <Link to="/">fdfdfdsfdsfdsfsdf</Link> */}
            </div >
            <a className="senhaEsquecida_Link" href="/"> Esqueceu a senha? </a>
          </div>
          <Botao nomeDoBotao="Login"/>
        </form>
      </section>
    </main>

  )
}

export default Login;