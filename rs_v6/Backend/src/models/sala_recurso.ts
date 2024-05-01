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

const getSalaByRecursos = async (recursos: string[]) => {
  const query = `
    SELECT sala_id
    FROM Salas_Recursos
    WHERE recurso_id IN (${recursos.map(() => "?").join(",")})
    GROUP BY sala_id
    HAVING COUNT(DISTINCT recurso_id) = ?
  `;

  const values = [...recursos, recursos.length];

  const result = await dbQuery(query, values);
  return result.map((row: any) => row.sala_id) as string[];
};

export const salaRecursoModel = {
  insertSalaRecurso,
  getSalaRecursos,
  getSalaByRecursos
};