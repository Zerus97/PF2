import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  status?: string; // Adding status to Evento interface
}

function MyEventos({ user }: MyEventosProps) {
  const [responsavelEventos, setResponsavelEventos] = useState<Evento[]>([]);
  const [participanteEventos, setParticipanteEventos] = useState<Evento[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [inviteMatricula, setInviteMatricula] = useState<string>("");

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

  const handleResponse = async (evento: Evento, status: string) => {
    try {
      await Http_api.respondConvite(evento.event_id, user, status);
      // Update the status locally to reflect the change immediately
      setResponsavelEventos((prev) =>
        prev.map((e) => (e.event_id === evento.event_id ? { ...e, status } : e))
      );
      setParticipanteEventos((prev) =>
        prev.map((e) => (e.event_id === evento.event_id ? { ...e, status } : e))
      );
    } catch (error) {
      console.error("Error responding to convite:", error);
    }
  };

  const handleInvite = async (evento_id: string) => {
    try {
      await Http_api.insertConvite(evento_id, inviteMatricula);
      setInviteMatricula(""); // Clear the text field after sending the invitation
      alert("Convite enviado com sucesso!");
    } catch (error) {
      console.error("Error sending convite:", error);
      alert("Erro ao enviar convite.");
    }
  };

  const renderEventoDetails = (evento: Evento) => (
    <Box sx={{ mt: 2 }}>
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
      {evento.status && (
        <TextField
          label="Status"
          value={evento.status}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      )}
      {participanteEventos.includes(evento) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleResponse(evento, "Aceitar")}
          >
            Aceitar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleResponse(evento, "Recusar")}
          >
            Recusar
          </Button>
        </Box>
      )}
      {responsavelEventos.includes(evento) && (
        <Box sx={{ mt: 2 }}>
          {expanded === evento.event_id && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Matricula do Participante"
                value={inviteMatricula}
                onChange={(e) => setInviteMatricula(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleInvite(evento.event_id)}
              >
                Enviar Convite
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
          width: "100%",
        }}
      >
        {responsavelEventos.length > 0 ? (
          responsavelEventos.map((evento) => (
            <Accordion
              key={evento.event_id}
              expanded={expanded === evento.event_id}
              onChange={handleAccordionChange(evento.event_id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${evento.event_id}-content`}
                id={`${evento.event_id}-header`}
              >
                <Typography>{evento.event_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>{renderEventoDetails(evento)}</AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>Nenhuma reserva encontrada.</Typography>
        )}

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Eventos como Participante
        </Typography>
        {participanteEventos.length > 0 ? (
          participanteEventos.map((evento) => (
            <Accordion
              key={evento.event_id}
              expanded={expanded === evento.event_id}
              onChange={handleAccordionChange(evento.event_id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${evento.event_id}-content`}
                id={`${evento.event_id}-header`}
              >
                <Typography>{evento.event_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>{renderEventoDetails(evento)}</AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>Nenhum evento encontrado.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default MyEventos;
