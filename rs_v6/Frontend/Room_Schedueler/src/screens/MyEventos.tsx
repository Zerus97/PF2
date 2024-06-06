import { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import Http_api from "../utils/Http_api";

interface MyEventosProps {
  user: string; // Matricula of the user
}

interface Evento {
  event_id: string;
  event_name: string;
  data: string;
  tmini: string;
  tmfim: string;
  num_participantes: string;
  tol: string;
  sala_id: string;
}

function MyEventos({ user }: MyEventosProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <Button
              key={evento.event_id}
              variant="outlined"
              sx={{ m: 1, width: "80%" }}
              onClick={() => setSelectedEvento(evento)}
            >
              {evento.event_name}
            </Button>
          ))
        ) : (
          <Typography>Nenhuma reserva encontrada.</Typography>
        )}

        {selectedEvento && (
          <Box sx={{ width: "80%", mt: 4 }}>
            <TextField
              label="Nome do Evento"
              value={selectedEvento.event_name}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Data"
              value={selectedEvento.data}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Hora de Início"
              value={selectedEvento.tmini}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Hora de Fim"
              value={selectedEvento.tmfim}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Número de Participantes"
              value={selectedEvento.num_participantes}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Tolerância"
              value={selectedEvento.tol}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Sala"
              value={selectedEvento.sala_id}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button variant="contained" sx={{ mt: 2 }}>
              Editar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MyEventos;
