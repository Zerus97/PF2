import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { Predio, predioModel } from "../models/predio";

const insertPredio = (req: Request, res: Response) => {
  const predio = req.body as Predio;

  if (!predio.predio_id) badRequest(res, "predio_id vazio");
  if (!predio.nome) badRequest(res, "nome vazio");

  predioModel
    .insertPredio(predio)
    .then((id) => {
      res.json({ id });
    })
    .catch((err) => internalServerError(res, err));
};

export const predioController = {
  insertPredio,
};
