import { dbQuery } from "../services/db";

export type Sala = {
    sala_id: string;
    predio: string;
    andar: number;
    numero: number
}

const insertSala = async (sala: Sala) => {
  const query = `INSERT INTO Salas VALUES (CONCAT('${sala.predio}', '${sala.andar}', '${sala.numero}'), ?, ?, ?);`
  await dbQuery(query, [
    sala.predio,
    sala.andar,
    sala.numero
  ]);
  let result = await dbQuery("SELECT sala_id FROM Salas WHERE sala_id = ?", [sala.sala_id]);
  return result[0].sala_id as string || undefined;
};
const getSala = async (params: string[]) => {
  let query = "SELECT sala_id FROM Salas WHERE 1 = 1";
  let values: any[] = [];

  if (params[0] != "-1") {
    query += " AND predio = ?";
    values.push(params[0]);
  }

  if (params[1] != "-1") {
    query += " AND andar = ?";
    values.push(params[1]);
  }

  const result = await dbQuery(query, values);
  return result as Sala[];
};

export const salaModel = {
  insertSala,
  getSala
};
