import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Login() {
  // Estados para armazenar os valores dos campos de entrada
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Função para lidar com o clique no botão de login
  const handleLogin = () => {
    // Aqui você pode usar os valores armazenados nos estados matricula e senha
    console.log("Matrícula:", matricula);
    console.log("Senha:", senha);
    // Você pode prosseguir com outras operações, como enviar esses dados para o servidor
    navigate("/main_menu");
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //backgroundColor: "lightblue",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Room Scheduler</h1>
        <TextField
          id="outlined-basic"
          label="Matrícula"
          variant="outlined"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          //backgroundColor: "lightgreen",
        }}
        noValidate
        autoComplete="off"
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
          style={{ alignSelf: "center", marginRight: "10px" }}
        >
          Entrar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
          style={{ alignSelf: "center" }}
        >
          Registrar
        </button>
      </Box>
    </>
  );
}

export default Login;
