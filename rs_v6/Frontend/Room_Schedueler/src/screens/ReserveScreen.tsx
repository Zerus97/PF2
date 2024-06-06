import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import Http_api from "../utils/Http_api";
import { useNavigate } from "react-router-dom";

interface ReserveScreenProps {
  user?: string;
}

export default function ReserveScreen({ user }: ReserveScreenProps) {
  const [predios, setPredios] = useState<string[]>([]);
  const [selectedPredio, setSelectedPredio] = useState<string>("");
  const [reserve_data, setReserve_data] = useState<Dayjs | null>(null);
  const [hr_ini, setHrini] = useState<Dayjs | null>(dayjs("2022-04-17T12:00"));
  const [hr_fim, setHrfim] = useState<Dayjs | null>(dayjs("2022-04-17T12:00"));
  const [numParticipantes, setNumParticipantes] = useState<number | string>("");
  const [tolerancia, setTolerancia] = useState<number | string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [recursos, setRecursos] = useState<string[]>([]);
  const [availableSalas, setAvailableSalas] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [hoveredRoomResources, setHoveredRoomResources] = useState<string[]>(
    []
  );
  const [isResourcesLoaded, setIsResourcesLoaded] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrediosAndRecursos = async () => {
      try {
        const prediosData = await Http_api.getPredios();
        setPredios(prediosData);

        const recursosData = await Http_api.getRecursos();
        setRecursos(recursosData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrediosAndRecursos();
  }, []);

  const handlePredioChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSelectedPredio(value);
  };

  const handleReserve_dataChange = (newValue: Dayjs | null) => {
    setReserve_data(newValue);
  };

  const handleHriniChange = (newValue: Dayjs | null) => {
    setHrini(newValue);
  };

  const handleHrfimChange = (newValue: Dayjs | null) => {
    setHrfim(newValue);
  };

  const handleNumParticipantesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumParticipantes(event.target.value);
  };

  const handleToleranciaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTolerancia(event.target.value);
  };

  const handleSelectedItemsChange = (
    event: SelectChangeEvent<typeof selectedItems>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(typeof value === "string" ? value.split(",") : value);
  };

  const handleSearchSalas = async () => {
    try {
      const searchParams = {
        recursos: selectedItems,
        capacidade: numParticipantes.toString(),
        date: reserve_data ? reserve_data.format("YYYY-MM-DD") : "",
        tmini: hr_ini ? hr_ini.format("HH:mm") : "",
        tmfim: hr_fim ? hr_fim.format("HH:mm") : "",
        predio: selectedPredio,
      };

      const availableSalas = await Http_api.searchSalas(searchParams);
      console.log("Available rooms:", availableSalas);

      setAvailableSalas(availableSalas);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching for rooms:", error);
    }
  };

  const handleRoomMouseEnter = async (roomId: string) => {
    try {
      const recursos = await Http_api.getSalaRecursos(roomId);
      setHoveredRoomResources(recursos);
      setIsResourcesLoaded(true);
    } catch (error) {
      console.error("Error fetching room resources:", error);
      setHoveredRoomResources([]);
      setIsResourcesLoaded(true);
    }
  };

  const handleRoomMouseLeave = () => {
    setHoveredRoomResources([]);
    setIsResourcesLoaded(false); // Reset resources loaded state
  };

  const handleReserveRoom = async (roomId: string) => {
    try {
      const response = await Http_api.insertEvento(
        reserve_data ? reserve_data.format("YYYY-MM-DD") : "",
        hr_ini ? hr_ini.format("HH:mm") : "",
        hr_fim ? hr_fim.format("HH:mm") : "",
        roomId,
        user || "", // Use user matricula here
        numParticipantes.toString(),
        tolerancia.toString()
      );

      setSnackbarMessage("Room reserved successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error reserving room:", error);
      setSnackbarMessage("Failed to reserve room.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <h1>Room Scheduler</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 4,
        }}
      >
        <Box sx={{ width: "35%", marginBottom: 4 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ minWidth: 245 }}>
                <InputLabel id="demo-simple-select-label">Prédio</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedPredio}
                  label="Prédio"
                  onChange={handlePredioChange}
                >
                  {predios.map((predio) => (
                    <MenuItem key={predio} value={predio}>
                      {predio}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data da reserva"
                  format="DD-MM-YYYY"
                  value={reserve_data}
                  onChange={handleReserve_dataChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Hora de Início"
                  value={hr_ini}
                  onChange={handleHriniChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Hora de Fim"
                  value={hr_fim}
                  onChange={handleHrfimChange}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "35%",
            "& .MuiTextField-root": { m: 1 },
          }}
        >
          <TextField
            id="num-participantes"
            label="Número de Participantes"
            type="number"
            value={numParticipantes}
            onChange={handleNumParticipantesChange}
          />
          <TextField
            id="tolerancia"
            label="Tolerância (minutos)"
            type="number"
            value={tolerancia}
            onChange={handleToleranciaChange}
          />
        </Box>
        <FormControl sx={{ m: 1, width: "35%" }}>
          <InputLabel id="demo-multiple-checkbox-label">Recursos</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedItems}
            onChange={handleSelectedItemsChange}
            input={<OutlinedInput label="Recursos" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {recursos.map((recurso) => (
              <MenuItem key={recurso} value={recurso}>
                <Checkbox checked={selectedItems.indexOf(recurso) > -1} />
                <ListItemText primary={recurso} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSearchSalas} sx={{ mt: 3 }}>
          Buscar Salas
        </Button>
      </Box>
      {showResults && (
        <Box sx={{ width: "80%", marginTop: "2rem" }}>
          <h2>Available Rooms</h2>
          {availableSalas.length > 0 ? (
            <Grid container spacing={2}>
              {availableSalas.map((room) => (
                <Grid item xs={12} md={6} key={room}>
                  <Tooltip
                    title={
                      hoveredRoomResources.length > 0
                        ? hoveredRoomResources.join(", ")
                        : "Loading resources..."
                    }
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      onMouseEnter={() => handleRoomMouseEnter(room)}
                      onMouseLeave={handleRoomMouseLeave}
                      onClick={() => handleReserveRoom(room)}
                    >
                      {room}
                    </Button>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No rooms available.</p>
          )}
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
