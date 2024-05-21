import { Box, Button, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  user?: string;
}

function MainMenu({ user }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          //backgroundColor: "lightblue",
          p: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Room Schedueler
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{user}</Typography>
          <FaUser style={{ marginLeft: "5px" }} />
        </Box>
      </Box>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          //backgroundColor: "lightcoral",
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
