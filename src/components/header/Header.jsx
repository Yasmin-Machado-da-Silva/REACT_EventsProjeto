import "./Header.css"
import Logo from "../../assets/img/logoEvents.svg"
import portaAdmin from "../../assets/img/portaAdmin.png"
// import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/* Ao clicar no link, rediriciona para a tela de login*/}
                {/* <Link to="/"> */}
                    <img src={Logo} alt="Logo do Events" />
                {/* </Link> */}

                <nav className="nav_header">
                    <a className="link_header" to="/filme">Home</a>
                    <a className="link_header" to="/genero">Eventos</a>
                    <a className="link_header" to="/genero">Usuários</a>
                    <a className="link_header" to="/genero">Contatos</a>
                    <a className="link_header" to="/genero">Administrador</a>

                    <img className="link_header" src={portaAdmin} alt="imagem Admin" />
                </nav>
            </div>
        </header>
    );
}

export default Header;