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

export default function ReserveScreen() {
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
  const [isResourcesLoaded, setIsResourcesLoaded] = useState<boolean>(false); // New state variable
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
        "1821315", // Placeholder for responsavel_id, replace with actual ID as needed
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
                  label="Hora do Fim"
                  value={hr_fim}
                  onChange={handleHrfimChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Participantes"
                type="number"
                value={numParticipantes}
                onChange={handleNumParticipantesChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tolerância (minutos)"
                type="number"
                value={tolerancia}
                onChange={handleToleranciaChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ minWidth: 245 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Itens Selecionados
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedItems}
                  onChange={handleSelectedItemsChange}
                  input={<OutlinedInput label="Itens Selecionados" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {recursos.map((item) => (
                    <MenuItem key={item} value={item}>
                      <Checkbox checked={selectedItems.indexOf(item) > -1} />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearchSalas}
                sx={{ marginRight: "1rem" }}
              >
                Procurar Salas
              </Button>
            </Grid>
          </Grid>
        </Box>

        {showResults && (
          <Box sx={{ width: "80%" }}>
            <h2>Salas disponíveis</h2>
            {availableSalas.length > 0 ? (
              <Grid container spacing={2}>
                {availableSalas.map((room) => (
                  <Grid item xs={12} md={6} key={room}>
                    <Tooltip
                      title={
                        isResourcesLoaded
                          ? hoveredRoomResources.length > 0
                            ? hoveredRoomResources.join(", ")
                            : "Sem recursos"
                          : "Carregando"
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
              <p>Sem salas disponíveis.</p>
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
      </Box>
    </>
  );
}
