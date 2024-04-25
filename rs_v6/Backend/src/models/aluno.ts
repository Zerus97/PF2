import { dbQuery } from "../services/db";

export type Aluno = {
  matricula: number;
  senha: string;
};

const insertAluno = async (aluno: Aluno) => {
  await dbQuery("INSERT INTO Aluno VALUES (?, ?)", [
    aluno.matricula,
    aluno.senha,
  ]);
  let result = await dbQuery("SELECT matricula FROM Aluno WHERE matricula = ?", [aluno.matricula]);
  return result[0].matricula as number || undefined;
};

const login = async (aluno: Aluno) => {
  let result = await dbQuery("SELECT 1 status FROM Aluno WHERE matricula = ? AND senha = ?", [
    aluno.matricula,
    aluno.senha,
  ]);
  return result.length;
};

export const alunoModel = {
  insertAluno,
  login
};
