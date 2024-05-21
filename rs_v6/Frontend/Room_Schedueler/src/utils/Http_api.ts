import axios from "axios";

async function login(matricula: number, senha: string) {
  try {
    const response = await axios.post(
      "http://localhost:8091/api/v1/aluno/login",
      {
        matricula: matricula,
        senha: senha,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPredios() {
  try {
    const response = await axios.get("http://localhost:8091/api/v1/predio/get");
    const response_array: string[] = [];
    for (let i = 0; i < response.data.predios.length; i++) {
      response_array[i] = response.data.predios[i].nome;
    }
    return response_array;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRecursos() {
  try {
    const response = await axios.get(
      "http://localhost:8091/api/v1/recurso/getAll"
    );
    const response_array: string[] = [];
    for (let i = 0; i < response.data.recursos.length; i++) {
      response_array[i] = response.data.recursos[i].recurso_id;
    }
    console.log(response_array);
    return response_array;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const Http_api = {
  login,
  getPredios,
  getRecursos,
};

export default Http_api;
