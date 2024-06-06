import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Http_api from "../utils/Http_api";

interface MyEventosProps {
  user: string; // Matricula of the user
}

interface Evento {
  event_id: string;
}

function MyEventos({ user }: MyEventosProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await Http_api.getEventosByResponsavel(user);
        setEventos(response);
      } catch (error) {
        console.error("Error fetching eventos:", error);
      }
    };

    if (user) {
      fetchEventos();
    }
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Minhas Reservas
      </Typography>
      {eventos.length > 0 ? (
        eventos.map((evento) => (
          <Button
            key={evento.event_id}
            variant="outlined"
            sx={{ m: 1, width: "80%" }}
          >
            {evento.event_id}
          </Button>
        ))
      ) : (
        <Typography>Nenhuma reserva encontrada.</Typography>
      )}
    </Box>
  );
}

export default MyEventos;
