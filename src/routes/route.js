import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login"
import CadastroFilme from "../pages/cadastroFilme/CadastroFilme"
import CadastroGenero from "../pages/cadastroGenero/CadastroGenero"

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Routes>
                {/*http://localhost:3000/ => Login*/}
                <Route path="/" element={<Login/>} exact/>
                {/*http://localhost:3000/Filme => Cadastro de filmes*/}
                <Route path="/filme" element={<CadastroFilme/>}/>
                {/*http://localhost:3000/Genero => Cadastro de genero*/}
                <Route path="/genero" element={<CadastroGenero/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
