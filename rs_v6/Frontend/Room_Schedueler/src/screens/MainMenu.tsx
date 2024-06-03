import { Box, Button, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Http_api from "../utils/Http_api";

interface Props {
  user?: string;
}

function MainMenu({ user }: Props) {
  console.log("user MainMenu prop: " + user);
  const [nome, setNome] = useState<string>(""); // State to store Nome
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNome = async () => {
      try {
        // Call getNome function from Http_api
        const response = await Http_api.getNome(user || ""); // Pass the user's matricula
        console.log("getNome MainMenu response: " + response);
        if (response && response.length > 0) {
          setNome(response[0]); // Assuming the response is an array with a single Nome
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
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Room Scheduler
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{nome}</Typography> {/* Display the fetched Nome */}
          <FaUser style={{ marginLeft: "5px" }} />
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
          onClick={() => console.log("Clicked")}
        >
          Calendário
        </Button>
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={() => console.log("Clicked")}
        >
          Minhas Reservas
        </Button>
      </Box>
    </>
  );
}

export default MainMenu;
