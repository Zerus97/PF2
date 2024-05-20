import { Request, Response } from "express";
import { reservaModel, Reserva } from "../models/reserva";
import { badRequest, internalServerError } from "../services/utils";

const insertReserva = (req: Request, res: Response) => {
  const reserva = req.body as Reserva;

  if (!reserva.matricula) return badRequest(res, "Matrícula inválida");
  if (!reserva.event_id) return badRequest(res, "ID do evento inválido");
  if (!reserva.status) return badRequest(res, "Status inválido");
  if (!reserva.data) return badRequest(res, "Data inválida");
  if (!reserva.time) return badRequest(res, "Hora inválida");

  reservaModel
    .insertReserveStatus(reserva)
    .then((status) => {
      res.json({ status });
    })
    .catch((err) => internalServerError(res, err));
};

export const reservaController = {
  insertReserva,
};
