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

async function getPredios() {
    try {
        const response = await axios.get('http://localhost:8091/api/v1/predio/get');
        const response_array: string[] = []
        for (let i = 0; i < response.data.predios.length; i++)
            {
                response_array[i] = response.data.predios[i].nome
            }
        return response_array;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to handle it outside this function if needed
    }
}

const Http_api = {
    login,
    getPredios
}

export default Http_api;