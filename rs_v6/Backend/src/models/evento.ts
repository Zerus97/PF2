import { dbQuery } from "../services/db";

export type Evento = {
  id_evento?: number;
  dtini: string;
  dtfim: string;
  tmini: string;
  tmfim: string;
  num_participantes: number;
  tol: number;
  status: string;
  id_sala: string;
  id_responsavel: number;
};

const insertEvento = async (evento: Evento) => {
  await dbQuery(
    `INSERT INTO Eventos (dtini, dtfim, tmini, tmfim, num_participantes, tol, status, id_sala, id_responsavel) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      evento.dtini,
      evento.dtfim,
      evento.tmini,
      evento.tmfim,
      evento.num_participantes,
      evento.tol,
      evento.status,
      evento.id_sala,
      evento.id_responsavel,
    ]
  );
  const result = await dbQuery("SELECT MAX(event_id) id FROM Eventos");
  return result[0].id as number;
};

export const eventoModel = {
  insertEvento,
};
