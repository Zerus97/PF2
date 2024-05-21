import { Request, Response } from "express";
import { Recurso, recursoModel } from "../models/recurso";
import { badRequest, internalServerError } from "../services/utils";

const insertRecurso = (req: Request, res: Response) => {
  const recurso = req.body as Recurso;

  if (!recurso.recurso_id) return badRequest(res, "Recurso Inválido");
  if (!recurso.preco) return badRequest(res, "Preço inválido");

  recursoModel
    .insertRecurso(recurso)
    .then((id) => {
      res.json({ id });
    })
    .catch((err) => internalServerError(res, err));
};

const getAllRecursos = (req: Request, res: Response) => {
  recursoModel
    .getAllRecursos()
    .then((recursos) => {
      res.json({ recursos });
    })
    .catch((err) => internalServerError(res, err));
};

export const recursoController = {
  insertRecurso,
  getAllRecursos,
};
