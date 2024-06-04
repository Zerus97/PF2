import { dbQuery } from "../services/db";

export type Aluno = {
  matricula: string;
  senha: string;
  nome: string;
};

const insertAluno = async (aluno: Aluno) => {
  await dbQuery("INSERT INTO Aluno VALUES (?, ?, ?)", [
    aluno.matricula,
    aluno.senha,
    aluno.nome,
  ]);
  let result = await dbQuery(
    "SELECT matricula FROM Aluno WHERE matricula = ?",
    [aluno.matricula]
  );
  return (result[0].matricula as string) || undefined;
};

const login = async (aluno: Aluno) => {
  let result = await dbQuery(
    "SELECT 1 status FROM Aluno WHERE matricula = ? AND senha = ?",
    [aluno.matricula, aluno.senha]
  );
  return result.length;
};

const getNome = async (matricula: string) => {
  let result = await dbQuery("SELECT nome FROM Aluno WHERE matricula = ?", [
    matricula,
  ]);
  return result[0].nome;
};

export const alunoModel = {
  insertAluno,
  login,
  getNome,
};
