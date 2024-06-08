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

const checkReservaTime = async (currentTime: string, type: string) => {
  let result = [];
  if (type == "tmini") {
    result = await dbQuery(
      `SELECT
Eventos.event_id
FROM Reservas
LEFT JOIN Eventos ON
Reservas.event_id = Eventos.event_id AND tmini = strftime("%H:%M", ?)
WHERE status = "Ativa"`,
      [currentTime]
    );
  } else {
    result = await dbQuery(
      `SELECT
Eventos.event_id
FROM Reservas
LEFT JOIN Eventos ON
Reservas.event_id = Eventos.event_id AND tmfim = strftime("%H:%M", ?)
WHERE status = "Em andamento"`,
      [currentTime]
    );
  }
  return result.map((row: any) => row.event_id) as string[];
};

const changeReservaStatus = async (event_id: string[], status: string) => {
  for (let i = 0; i < event_id.length; i++) {
    await dbQuery(`UPDATE Reservas SET status = ? WHERE event_id = ?`, [
      status,
      event_id[i],
    ]);
  }
  return 1;
};

export const reservaModel = {
  insertReserveStatus,
  checkReservaTime,
  changeReservaStatus,
};
