import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { Convite, Evento, eventoModel } from "../models/evento";
import { Reserva, reservaModel } from "../models/reserva";

const insertEvento = async (req: Request, res: Response) => {
  const evento = req.body as Evento;
  //console.log(evento);

  // Validate input
  if (!evento.data) return badRequest(res, "Data inválida");
  if (!evento.tmini) return badRequest(res, "Hora de início inválida");
  if (!evento.tmfim) return badRequest(res, "Hora de fim inválida");
  if (!evento.num_participantes) evento.num_participantes = -1;
  if (!evento.tol) evento.tol = -1;
  if (!evento.sala_id) return badRequest(res, "ID da sala inválido");
  if (!evento.responsavel_id)
    return badRequest(res, "ID do responsável inválido");
  if (!evento.event_name) return badRequest(res, "event_name vazio");
  if (evento.tmfim < evento.tmini) return badRequest(res, "horário inválido");

  try {
    const id = await eventoModel.insertEvento(evento);

    const currentTime = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const reserva = {
      matricula: evento.responsavel_id,
      event_id: id,
      status: "Ativa",
      data: evento.data,
      time: currentTime,
    } as Reserva;

    const status = await reservaModel.insertReserveStatus(reserva);

    res.json({ id, status });
  } catch (err) {
    internalServerError(res, err as Error);
  }
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
    .then((evento) => {
      res.json(evento);
    })
    .catch((err) => internalServerError(res, err));
};

const getEventosByParticipante = (req: Request, res: Response) => {
  const { participante_id } = req.params;

  if (!participante_id) return badRequest(res, "ID do participante inválido");

  eventoModel
    .getEventosByParticipante(Number(participante_id))
    .then((evento) => {
      res.json(evento);
    })
    .catch((err) => internalServerError(res, err));
};

const insertConvite = async (req: Request, res: Response) => {
  const convite = req.body as Convite;
  try {
    const id = await eventoModel.insertConvite(convite);

    res.json({ id });
  } catch (err) {
    internalServerError(res, err as Error);
  }
};

const respondConvite = async (req: Request, res: Response) => {
  const convite = req.body as Convite;
  try {
    const id = await eventoModel.respondConvite(convite);

    res.json({ id });
  } catch (err) {
    internalServerError(res, err as Error);
  }
};

const getOngoingEventsByMatricula = (req: Request, res: Response) => {
  const { matricula } = req.params;

  if (!matricula) return badRequest(res, "ID do responsável inválido");

  eventoModel
    .getOngoingEventsByMatricula(Number(matricula))
    .then((evento) => {
      res.json(evento);
    })
    .catch((err) => internalServerError(res, err));
};

export const eventoController = {
  insertEvento,
  getAvailableSalas,
  getEventosByResponsavel,
  getEventosByParticipante,
  insertConvite,
  respondConvite,
  getOngoingEventsByMatricula,
};
