//CRIANDO APPPIIIII 🎉🎉🎉
import axios from "axios";

// http://localhost:5289
const portaApi = "5289"

//Aqui a porta vai receber o endereço da api :>
const apiLocal = `http://localhost:${portaApi}/api`

//Criando a intância do Axios com baseURL
const api = axios.create({
    baseURL: apiLocal
});

export default api