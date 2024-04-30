import { dbQuery } from "../services/db";

export type Recurso = {
    recurso_id: string;
    preco: number
};

const insertRecurso = async (recurso: Recurso) => {
    await dbQuery("INSERT INTO Recursos VALUES (?, ?)", [recurso.recurso_id, recurso.preco])
    let result = await dbQuery("SELECT recurso_id FROM Recursos WHERE recurso_id = ?", [recurso.recurso_id]);
  return result[0].recurso_id as string || undefined;
};

export const recursoModel = {
    insertRecurso,
};