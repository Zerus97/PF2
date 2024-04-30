import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils"
import { SalaRecurso, salaRecursoModel } from "../models/sala_recurso";

const insertSalaRecurso = (req: Request, res: Response) => {
  const salaRecurso = req.body as SalaRecurso;

  if (!salaRecurso.sala_id) badRequest(res, "ID da sala vazio");
  if (!salaRecurso.recurso_id) badRequest(res, "ID do recurso vazio");
  if (!salaRecurso.quantidade) badRequest(res, "Quantidade vazia");

  salaRecursoModel
    .insertSalaRecurso(salaRecurso)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => internalServerError(res, err));
};

const getSalaRecursos = (req: Request, res: Response) => {
  const { sala_id } = req.params;

  if (!sala_id) badRequest(res, "ID da sala vazio");

  salaRecursoModel
    .getSalaRecursos(sala_id)
    .then((recursos) => {
      res.json({ recursos });
    })
    .catch((err) => internalServerError(res, err));
};

export const salaRecursoController = {
  insertSalaRecurso,
  getSalaRecursos
};
