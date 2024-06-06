import { dbQuery } from "../services/db";

export type Evento = {
  evento_id?: number;
  event_name: string;
  data: string;
  tmini: string;
  tmfim: string;
  num_participantes: number;
  tol: number;
  sala_id: string;
  responsavel_id: number;
};

const insertEvento = async (evento: Evento) => {
  await dbQuery(
    `INSERT INTO Eventos (data, tmini, tmfim, num_participantes, tol, sala_id, responsavel_id, event_name) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      evento.data,
      evento.tmini,
      evento.tmfim,
      evento.num_participantes,
      evento.tol,
      evento.sala_id,
      evento.responsavel_id,
      evento.event_name,
    ]
  );
  const result = await dbQuery("SELECT MAX(event_id) id FROM Eventos");
  return result[0].id as number;
};

const getAvailableSalas = async (
  date: string,
  tmini: string,
  tmfim: string
) => {
  const result = await dbQuery(
    `SELECT sala_id FROM Salas 
     WHERE sala_id NOT IN (
        SELECT sala_id FROM Eventos WHERE data = ? AND (
            (? BETWEEN tmini AND tmfim)
             AND (? BETWEEN tmini AND tmfim)
            OR (? < tmini AND ? > tmini) 
             OR ? = tmini)
     )`,
    [date, tmini, tmfim, tmini, tmfim, tmini]
  );
  return result.map((row: any) => row.sala_id) as string[];
};

const getEventosByResponsavel = async (responsavel_id: number) => {
  const result = await dbQuery(
    `SELECT event_id, event_name, data, tmini, tmfim, num_participantes, tol, sala_id FROM Eventos WHERE responsavel_id = ?`,
    [responsavel_id]
  );
  return result;
};

export const eventoModel = {
  insertEvento,
  getAvailableSalas,
  getEventosByResponsavel,
};
