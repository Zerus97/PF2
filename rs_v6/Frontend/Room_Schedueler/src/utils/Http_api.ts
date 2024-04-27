import axios from "axios";

async function login(matricula: number, senha: string) {
    await axios({
        method: 'post',
        url: 'http://localhost:8091/api/v1/aluno/login',
        data: {
          matricula: matricula,
          senha: senha
        }
      }).then(() => {console.log("Request Sent")}).catch(() => {console.log("Request Failed")})
}

const Http_api = {
    login
}

export default Http_api