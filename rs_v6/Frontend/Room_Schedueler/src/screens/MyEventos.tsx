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
  const [responsavelEventos, setResponsavelEventos] = useState<Evento[]>([]);
  const [participanteEventos, setParticipanteEventos] = useState<Evento[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const [responsavelResponse, participanteResponse] = await Promise.all([
          Http_api.getEventosByResponsavel(user),
          Http_api.getEventosByParticipante(user),
        ]);

        setResponsavelEventos(responsavelResponse);
        setParticipanteEventos(participanteResponse);
      } catch (error) {
        console.error("Error fetching eventos:", error);
      }
    };

    if (user) {
      fetchEventos();
    }
  }, [user]);

  const renderEventoDetails = (evento: Evento) => (
    <Box sx={{ width: "80%", mt: 4 }}>
      <TextField
        label="Nome do Evento"
        value={evento.event_name}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Data"
        value={evento.data}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Hora de Início"
        value={evento.tmini}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Hora de Fim"
        value={evento.tmfim}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Número de Participantes"
        value={evento.num_participantes}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Tolerância"
        value={evento.tol}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Sala"
        value={evento.sala_id}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );

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
        {responsavelEventos.length > 0 ? (
          responsavelEventos.map((evento) => (
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

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Eventos como Participante
        </Typography>
        {participanteEventos.length > 0 ? (
          participanteEventos.map((evento) => (
            <Button
              key={evento.event_id}
              variant="contained"
              sx={{ m: 1, width: "80%", backgroundColor: "green" }}
              onClick={() => setSelectedEvento(evento)}
            >
              {evento.event_name}
            </Button>
          ))
        ) : (
          <Typography>Nenhum evento encontrado.</Typography>
        )}

        {selectedEvento && renderEventoDetails(selectedEvento)}
      </Box>
    </Box>
  );
}

export default MyEventos;
