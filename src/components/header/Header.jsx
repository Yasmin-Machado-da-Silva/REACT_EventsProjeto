import "./Header.css";
import Logo1 from "../../assets/img/logoEvents.svg"
import Admin from "../../assets/img/portaAdmin.png"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/">
                    <img src={Logo1} alt="Logo do Events" />
                </Link>
                <nav className="nav_header">
                    <Link className="link_header" to="/">Home</Link>
                    <Link className="link_header" to="/tipo_evento">Eventos</Link>
                    <Link className="link_header" to="/tipo_usuario">Usuários</Link>
                    <Link className="link_header" to="/">Contatos</Link>
                </nav>
                <nav className="nav_header admin">
                    <Link className="link_header adm" to="/evento">Administrador</Link>
                    <img src={Admin} alt="" className="Admin IMG" />
                    
                </nav>
            </div>
        </header>
    )
}
export default Header;