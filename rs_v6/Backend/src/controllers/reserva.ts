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

const checkReservaTime = async () => {
  const currentTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const event_ids = await reservaModel.checkReservaTime(currentTime, "tmini");

  await reservaModel.changeReservaStatus(event_ids, "Em andamento");

  const event_ids2 = await reservaModel.checkReservaTime(currentTime, "tmfim");

  await reservaModel.changeReservaStatus(event_ids2, "Finalizada");
  return 1;
};

setInterval(checkReservaTime, 5000);

export const reservaController = {
  insertReserva,
};
