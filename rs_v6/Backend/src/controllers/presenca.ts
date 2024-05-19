import { Request, Response } from "express";
import { presencaModel, Presenca } from "../models/presenca";
import { badRequest, internalServerError } from "../services/utils";

const insertPresenca = (req: Request, res: Response) => {
  const presenca = req.body as Presenca;

  if (!presenca.matricula) return badRequest(res, "Matrícula inválida");
  if (!presenca.event_id) return badRequest(res, "ID do evento inválido");
  if (!presenca.time) return badRequest(res, "Horário inválido");
  if (!presenca.type) return badRequest(res, "Tipo de presença inválido");

  presencaModel
    .insertPresenca(presenca)
    .then((matricula) => {
      res.json({ matricula });
    })
    .catch((err) => internalServerError(res, err));
};

export const presencaController = {
  insertPresenca,
};
