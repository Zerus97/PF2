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

export type Convite = {
  evento_id: number;
  participante_id: number;
  status?: string;
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

const getEventosByParticipante = async (participante_id: number) => {
  const result = await dbQuery(
    `WITH my_eventos AS (SELECT event_id, status FROM Convites WHERE convidado_matricula = ?)
SELECT a.event_id, 
event_name, 
data, 
tmini, 
tmfim, 
num_participantes, 
tol, sala_id, status 
FROM Eventos a, my_eventos b 
WHERE a.event_id = b.event_id`,
    [participante_id]
  );
  return result;
};

const insertConvite = async (convite: Convite) => {
  await dbQuery(
    `INSERT INTO Convites (event_id, convidado_matricula, status) VALUES (?, ?, "Pendente")`,
    [convite.evento_id, convite.participante_id]
  );
  const result = await dbQuery(
    "SELECT 1 id FROM Convites WHERE event_id = ? AND convidado_matricula = ?",
    [convite.evento_id, convite.participante_id]
  );
  return result[0].id;
};

const respondConvite = async (convite: Convite) => {
  await dbQuery(
    `UPDATE Convites SET status = ? WHERE event_id = ? AND convidado_matricula = ?`,
    [convite.status, convite.evento_id, convite.participante_id]
  );
  const result = await dbQuery(
    "SELECT 1 id FROM Convites WHERE event_id = ? AND convidado_matricula = ?",
    [convite.evento_id, convite.participante_id]
  );
  return result[0].id;
};

export const eventoModel = {
  insertEvento,
  getAvailableSalas,
  getEventosByResponsavel,
  getEventosByParticipante,
  insertConvite,
  respondConvite,
};
