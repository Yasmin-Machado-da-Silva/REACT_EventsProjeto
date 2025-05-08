import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login"
import CadastroTipoEvento from "../pages/cadastroTE/CadastroTipoEvento"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoUsuario from "../pages/cadastroTU/CadastroTipoUsuario"

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Routes>
                {/*http://localhost:3000/ => Login*/}
                <Route path="/" element={<Login/>} exact/>
                {/*http://localhost:3000/tipo_evento => Cadastro de tipo de evento*/}
                <Route path="/tipo_evento" element={<CadastroTipoEvento/>}/>
                {/*http://localhost:3000/evento => Cadastro de evento*/}
                <Route path="/evento" element={<CadastroEvento/>}/>
                {/*http://localhost:3000/tipo_usuario => Cadastro de tipo de usuario*/}
                <Route path="/tipo_usuario" element={<CadastroTipoUsuario/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
