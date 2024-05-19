import { dbQuery } from "../services/db";

export type Presenca = {
  matricula: number;
  event_id: number;
  time: string;
  type: string;
};

const insertPresenca = async (presenca: Presenca) => {
  let tol_test = await dbQuery(
    "WITH base_teste AS (SELECT time(tmini, '+' || tol || ' minute') AS tol_limit FROM Eventos  WHERE event_id = ?) SELECT ? < tol_limit AS result FROM base_teste",
    [presenca.event_id, presenca.time]
  );
  tol_test = tol_test[0].result;
  if (!tol_test) return "Limite de tolerância excedido!";

  await dbQuery("INSERT INTO Presencas VALUES (?, ?, ?, ?)", [
    presenca.matricula,
    presenca.event_id,
    presenca.time,
    presenca.type,
  ]);
  let result = await dbQuery(
    "SELECT matricula FROM Presencas WHERE matricula = ? AND event_id = ?",
    [presenca.matricula, presenca.event_id]
  );
  return (result[0].matricula as number) || undefined;
};

export const presencaModel = {
  insertPresenca,
};
