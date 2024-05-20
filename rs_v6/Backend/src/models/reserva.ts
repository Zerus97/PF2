import { dbQuery } from "../services/db";

export type Reserva = {
  matricula: number;
  event_id: number;
  status: string;
  data: string;
  time: string;
};

const insertReserveStatus = async (reserva: Reserva) => {
  await dbQuery("INSERT INTO Reservas VALUES (?, ?, ?, ?, ?)", [
    reserva.matricula,
    reserva.event_id,
    reserva.status,
    reserva.data,
    reserva.time,
  ]);
  let result = await dbQuery(
    "SELECT status, time FROM Reservas WHERE matricula = ? AND event_id = ? ORDER BY time DESC",
    [reserva.matricula, reserva.event_id]
  );
  return (result[0].status as number) || undefined;
};

export const reservaModel = {
  insertReserveStatus,
};
