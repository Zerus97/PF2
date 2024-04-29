import axios from "axios";
 
async function login(matricula: number, senha: string) {
    try {
        const response = await axios.post('http://localhost:8091/api/v1/aluno/login', {
            matricula: matricula,
            senha: senha
        });
        return response.data; // Return the data from the axios call
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to handle it outside this function if needed
    }
}

const Http_api = {
    login
}

export default Http_api;