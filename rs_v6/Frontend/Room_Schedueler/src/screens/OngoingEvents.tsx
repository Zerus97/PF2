import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Http_api from "../utils/Http_api";

interface OngoingEventsProps {
  userMatricula: string;
}

interface Event {
  event_id: string;
  event_name: string;
  data: string;
  tmini: string;
  tmfim: string;
  sala_id: string;
  tol: string;
}

const OngoingEvents: React.FC<OngoingEventsProps> = ({ userMatricula }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOngoingEvents = async () => {
      try {
        setLoading(true);
        const response = await Http_api.getOngoingEventsByMatricula(
          userMatricula
        );
        setEvents(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ongoing events:", error);
        setError("Failed to load ongoing events.");
        setLoading(false);
      }
    };

    if (userMatricula) {
      fetchOngoingEvents();
    }
  }, [userMatricula]);

  const handleEventSelect = (event_id: string) => {
    setSelectedEventId(event_id === selectedEventId ? null : event_id);
  };

  const handleRegister = async (type: string) => {
    if (selectedEventId) {
      try {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const currentTime = `${hours}:${minutes}`;
        await Http_api.insertPresenca(
          userMatricula,
          selectedEventId,
          currentTime,
          type
        );
        alert(`Presença registrada com sucesso: ${type}`);
      } catch (error) {
        console.error(`Error registering presence (${type}):`, error);
        alert(`Falha ao registrar presença: ${type}`);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ongoing Events
      </Typography>
      {events.length > 0 ? (
        <List>
          {events.map((event) => (
            <ListItem
              key={event.event_id}
              divider
              onClick={() => handleEventSelect(event.event_id)}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  event.event_id === selectedEventId ? "lightgray" : "inherit",
              }}
            >
              <ListItemText
                primary={event.event_name}
                secondary={`Date: ${event.data} | Time: ${event.tmini} - ${event.tmfim} | Room: ${event.sala_id} | Tolerância de atraso: ${event.tol}`}
              />
              {selectedEventId === event.event_id && (
                <Box
                  sx={{ display: "flex", gap: 1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleRegister("Entrada")}
                  >
                    Registrar Entrada
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleRegister("Saída")}
                  >
                    Registrar Saída
                  </Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No ongoing events found.</Typography>
      )}
    </Box>
  );
};

export default OngoingEvents;
