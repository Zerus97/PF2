import { dbQuery } from "../services/db";

export type Aluno = {
  matricula: number;
  nome: string;
};

const insertAluno = async (aluno: Aluno) => {
  await dbQuery("INSERT INTO Aluno VALUES (?, ?)", [
    aluno.matricula,
    aluno.nome,
  ]);
  let id = dbQuery(
    "SELECT matricula FROM sqlite_sequence WHERE name = 'Aluno'"
  );
  return aluno.matricula as number;
};

export const alunoModel = {
  insertAluno,
};
