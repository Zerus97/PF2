import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";

const AvailableRooms = () => {
  const location = useLocation();
  const availableSalas = location.state?.availableSalas || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Rooms
      </Typography>
      {availableSalas.length > 0 ? (
        <List>
          {availableSalas.map((room: string, index: number) => (
            <Paper key={index} sx={{ marginBottom: 2, padding: 2 }}>
              <ListItem>
                <ListItemText primary={room} />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No rooms available.</Typography>
      )}
    </Box>
  );
};

export default AvailableRooms;
