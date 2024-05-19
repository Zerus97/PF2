import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { Evento, eventoModel } from "../models/evento";

const insertEvento = (req: Request, res: Response) => {
  const evento = req.body as Evento;

  if (!evento.data) return badRequest(res, "Data inválida");
  if (!evento.tmini) return badRequest(res, "Hora de início inválida");
  if (!evento.tmfim) return badRequest(res, "Hora de fim inválida");
  if (!evento.num_participantes)
    return badRequest(res, "Número de participantes inválido");
  if (!evento.tol) return badRequest(res, "Tolerância inválida");
  if (!evento.sala_id) return badRequest(res, "ID da sala inválido");
  if (!evento.responsavel_id)
    return badRequest(res, "ID do responsável inválido");

  eventoModel
    .insertEvento(evento)
    .then((id) => {
      res.json({ id });
    })
    .catch((err) => internalServerError(res, err));
};

const getAvailableSalas = (req: Request, res: Response) => {
  const { date, tmini, tmfim } = req.query;

  if (!date) return badRequest(res, "Data inválida");
  if (!tmini) return badRequest(res, "Hora de início inválida");
  if (!tmfim) return badRequest(res, "Hora de fim inválida");

  eventoModel
    .getAvailableSalas(date as string, tmini as string, tmfim as string)
    .then((salas) => {
      res.json(salas);
    })
    .catch((err) => internalServerError(res, err));
};

const getEventosByResponsavel = (req: Request, res: Response) => {
  const { responsavel_id } = req.params;

  if (!responsavel_id) return badRequest(res, "ID do responsável inválido");

  eventoModel
    .getEventosByResponsavel(Number(responsavel_id))
    .then((eventos) => {
      res.json(eventos);
    })
    .catch((err) => internalServerError(res, err));
};

export const eventoController = {
  insertEvento,
  getAvailableSalas,
  getEventosByResponsavel,
};
