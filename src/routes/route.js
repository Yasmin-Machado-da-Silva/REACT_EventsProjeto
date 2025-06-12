import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login"
import CadastroTipoEvento from "../pages/cadastroTE/CadastroTipoEvento"
import NotFound from "../pages/notFound/NotFound";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoUsuario from "../pages/cadastroTU/CadastroTipoUsuario"
import Lista from "../pages/listagemEventoAluno/ListaEvento"
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Privado = (props) => {
    const { usuario } = useAuth();
    //toke, idUsuario, tipoUsuario

    // Se não estiver autenticado, manda para login
    if (!usuario) {
        return <Navigate to="/NotFound" />;
    }
    // Se o tipo do usuário não for o permitido, bloqueia
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        //ir para a tela de nao encontrado!
        return <Navigate to="/NotFound" />;
    }

    // Senão, renderiza o componente passado
    return <props.Item />;
};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*http://localhost:3000/ => Login*/}
                <Route path="/" element={<Login />} exact />
                {/*http://localhost:3000/ => Pagina não encontrada*/}
                <Route element={<NotFound />} path="/NotFound" />
                {/*http://localhost:3000/tipo_evento => Cadastro de tipo de evento*/}
                <Route element={<Privado tipoPermitido="ADM" Item={CadastroTipoEvento} />} path="/tipo_evento" exact />
                {/*http://localhost:3000/evento => Cadastro de evento*/}
                <Route element={<Privado tipoPermitido="ADM" Item={CadastroEvento} />} path="/evento" exact />
                {/*http://localhost:3000/tipo_usuario => Cadastro de tipo de usuario*/}
                <Route element={<Privado tipoPermitido="ADM" Item={CadastroTipoUsuario} />} path="/tipo_usuario" exact />
                {/*http://localhost:3000/tipo_usuario => Cadastro de tipo de usuario*/}
                <Route element={<Privado tipoPermitido="Aluno" Item={Lista} />} path="/lista" exact />


                {/* Lista da Samanta */}
                {/* <Route path="/" element={<Login/>} exact/> 
                <Route path="/TipoEvento" element={<Privado tipoPermitido="admin" item={CadastroTipoEvento}/>} exact/>
                <Route path="/TipoUsuario" element={<Privado tipoPermitido="admin" item={CadastroTipoUsuario}/>} exact/>
                <Route path="/CadastroEvento" element={<Privado tipoPermitido="admin" item={CadastroEvento}/>} exact/>
                <Route path="/Lista" element={<Privado tipoPermitido="aluno" item={Lista}/>} exact/>  */}
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
