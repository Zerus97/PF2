import { dbQuery } from "../services/db";

export type Sala = {
    sala_id: string;
    predio: string;
    andar: number;
    numero: number
}

const insertSala = async (sala: Sala) => {
  await dbQuery("INSERT INTO Salas VALUES (?, ?, ?, ?)", [
  sala.sala_id,
  sala.predio,
  sala.andar,
  sala.numero
  ]);
  let result = await dbQuery("SELECT sala_id FROM Salas WHERE sala_id = ?", [sala.sala_id]);
  return result[0].sala_id as number || undefined;
};

export const salaModel = {
  insertSala
}