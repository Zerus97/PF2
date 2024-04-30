import { dbQuery } from "../services/db";

export type SalaRecurso = {
  sala_id: string;
  recurso_id: string;
  quantidade: number;
};

const insertSalaRecurso = async (salaRecurso: SalaRecurso) => {
  await dbQuery("INSERT INTO Salas_Recursos VALUES (?, ?, ?)", [
    salaRecurso.sala_id,
    salaRecurso.recurso_id,
    salaRecurso.quantidade,
  ]);
};

const getSalaRecursos = async (sala_id: string) => {
  const result = await dbQuery("SELECT recurso_id, quantidade FROM Salas_Recursos WHERE sala_id = ?", [sala_id]);
  return result as SalaRecurso[];
};

export const salaRecursoModel = {
  insertSalaRecurso,
  getSalaRecursos
};
