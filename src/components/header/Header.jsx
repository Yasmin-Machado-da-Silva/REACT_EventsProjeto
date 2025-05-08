import "./Header.css"
import Logo from "../../assets/img/logoEvents.svg"
import portaAdmin from "../../assets/img/portaAdmin.png"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/* Ao clicar no link, rediriciona para a tela de login*/}
                <Link to="/">
                <img src={Logo} alt="Logo do Events" />
                </Link>

                <nav className="nav_header">
                    <div>
                        <Link className="link_header" to="/">Home</Link>
                        <Link className="link_header" to="/tipo_evento">Eventos</Link>
                        <Link className="link_header" to="/tipo_usuario">Usuários</Link>
                        <Link className="link_header" to="/">Contatos</Link>
                        
                        
                            <Link className="link_header adm" to="/evento">Administrador</Link>
                            <img className="link_header adm" src={portaAdmin} alt="imagem Admin" />
                        
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;