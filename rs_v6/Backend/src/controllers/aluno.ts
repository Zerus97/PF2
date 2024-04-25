import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { Aluno, alunoModel } from "../models/aluno";

const insertAluno = (req: Request, res: Response) => {
  const aluno = req.body as Aluno;

  if (!aluno.matricula) badRequest(res, "Matrícula Inválida");

  if (!aluno.senha) badRequest(res, "Senha inválida");

  alunoModel
    .insertAluno(aluno)
    .then((id) => {
      res.json({ id });
    })
    .catch((err) => internalServerError(res, err));
};

const login = (req: Request, res: Response) => {
  const aluno = req.body as Aluno;

  if (!aluno.matricula) badRequest(res, "Matrícula Inválida");

  if (!aluno.senha) badRequest(res, "Senha inválido");

  alunoModel
    .login(aluno)
    .then((id) => {
      res.json({ id });
    })
    .catch((err) => internalServerError(res, err));
};

export const alunoController = {
  insertAluno,
  login
};
