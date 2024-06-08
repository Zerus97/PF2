import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Http_api from "../utils/Http_api";

interface Props {
  user?: string;
}

const MainMenu: React.FC<Props> = ({ user }) => {
  const [nome, setNome] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNome = async () => {
      try {
        const response = await Http_api.getNome(user || "");
        if (response && response.length > 0) {
          setNome(response);
        }
      } catch (error) {
        console.error("Error fetching Nome:", error);
      }
    };

    if (user) {
      fetchNome();
    }
  }, [user]);

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">Room Scheduler</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
            textAlign: "center",
          }}
        >
          <FaUser style={{ fontSize: "24px" }} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {nome}
          </Typography>
        </Box>
      </Box>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "fit-content", mb: 1 }}
          onClick={() => navigate("/reserving")}
        >
          Reservar Salas
        </Button>
        <Button
          variant="contained"
          sx={{ width: "fit-content", mb: 1 }}
          onClick={() => navigate("/my_eventos")}
        >
          Minhas Reservas
        </Button>
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={() => navigate("/eventos_andamento")}
        >
          Eventos em Andamento
        </Button>
      </Box>
    </>
  );
};

export default MainMenu;
