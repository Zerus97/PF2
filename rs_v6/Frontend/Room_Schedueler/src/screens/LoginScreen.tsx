import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Http_api from "../utils/Http_api";
function Login() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Matrícula:", matricula);
    console.log("Senha:", senha);
    const response = await Http_api.login(Number(matricula), senha);
    if (response.id) {
      navigate("/main_menu");
    }
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
