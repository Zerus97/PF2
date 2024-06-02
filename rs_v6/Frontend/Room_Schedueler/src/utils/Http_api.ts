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
    return response_array;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getSalaRecursos(sala_id: string) {
  try {
    const response = await axios.get(
      "http://localhost:8091/api/v1/sala_recurso/get/" + sala_id
    );
    const response_array: string[] = [];
    for (let i = 0; i < response.data.recursos.length; i++) {
      response_array[i] = response.data.recursos[i].recurso_id;
    }
    return response_array;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function searchSalas(params: {
  recursos: string[];
  capacidade: string;
  date: string;
  tmini: string;
  tmfim: string;
}) {
  try {
    const response = await axios.post(
      "http://localhost:8091/api/v1/searcher",
      params
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function insertEvento(
  data: string,
  tmini: string,
  tmfim: string,
  sala_id: string,
  responsavel_id: string,
  num_participantes?: string,
  tol?: string,
  predio?: string
) {
  try {
    responsavel_id = "1821315";
    const response = await axios.post(
      "http://localhost:8091/api/v1/evento/post_evento",
      {
        data,
        tmini,
        tmfim,
        sala_id,
        responsavel_id,
        num_participantes,
        tol,
        predio,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const Http_api = {
  login,
  getPredios,
  getRecursos,
  getSalaRecursos,
  searchSalas,
  insertEvento,
};

export default Http_api;
