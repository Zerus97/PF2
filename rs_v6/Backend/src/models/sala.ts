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
  let result = await dbQuery("SELECT sala_id FROM Salas WHERE sala_id = ?", [sala.predio + sala.andar + sala.numero]);
  return result[0].sala_id as number || undefined;
};

export const salaModel = {
  insertSala
}