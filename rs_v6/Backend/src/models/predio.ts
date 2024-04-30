import { dbQuery } from "../services/db";

export type Predio = {
    predio_id: string;
    nome: string;
  }
  
const insertPredio = async (predio: Predio) => {
    await dbQuery("INSERT INTO Predios VALUES (?, ?)", [
    predio.predio_id,
    predio.nome,
    ]);
    let result = await dbQuery("SELECT predio_id FROM Predios WHERE predio_id = ?", [predio.predio_id]);
    return result[0].predio_id as number || undefined;
};

export const predioModel = {
    insertPredio
  };
  