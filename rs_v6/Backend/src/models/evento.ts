import { dbQuery } from "../services/db";

export type Evento = {
  evento_id?: number;
  dtini: string;
  dtfim: string;
  tmini: string;
  tmfim: string;
  num_participantes: number;
  tol: number;
  status: string;
  sala_id: string;
  responsavel_id: number;
};

const insertEvento = async (evento: Evento) => {
  await dbQuery(
    `INSERT INTO Eventos (dtini, dtfim, tmini, tmfim, num_participantes, tol, status, sala_id, responsavel_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      evento.dtini,
      evento.dtfim,
      evento.tmini,
      evento.tmfim,
      evento.num_participantes,
      evento.tol,
      evento.status,
      evento.sala_id,
      evento.responsavel_id,
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
        SELECT sala_id FROM Eventos WHERE dtini = ? AND (
            (? BETWEEN tmini AND tmfim)
             AND (? BETWEEN tmini AND tmfim)
            OR (? < tmini AND ? > tmini) 
             OR ? = tmini)
     )`,
    [date, tmini, tmfim, tmini, tmfim, tmini]
  );
  return result;
};

export const eventoModel = {
  insertEvento,
  getAvailableSalas,
};
