import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { Sala, salaModel } from "../models/sala";

const insertSala = (req: Request, res: Response) => {
  const sala = req.body as Sala;
  if (!sala.predio) badRequest(res, "predio vazio");
  if (!sala.andar) badRequest(res, "andar vazio");
  if (!sala.numero) badRequest(res, "numero vazio");

  salaModel
    .insertSala(sala)
    .then((id) => {
      res.json({ id });
    })
    .catch((err) => internalServerError(res, err));
};

const getSala = (req: Request, res: Response) => {
  const params: string[] = [];
  params[0] = req.params.predio;
  params[1] = req.params.andar;

  salaModel
  .getSala(params)
  .then((salas) => {
    res.json({ salas });
  })
  .catch((err) => internalServerError(res, err));
}

export const salaController = {
  insertSala,
  getSala
};
