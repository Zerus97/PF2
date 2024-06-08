import { Router } from "express";
import { eventoController } from "../controllers/evento";

const eventoRouter = Router();

eventoRouter.post("/post_evento", eventoController.insertEvento);
eventoRouter.get("/available_salas", eventoController.getAvailableSalas);
eventoRouter.get(
  "/responsavel_eventos/:responsavel_id",
  eventoController.getEventosByResponsavel
);
eventoRouter.get(
  "/participante_eventos/:participante_id",
  eventoController.getEventosByParticipante
);
eventoRouter.post("/convite", eventoController.insertConvite);
eventoRouter.put("/respond_convite", eventoController.respondConvite);
eventoRouter.get(
  "/ongoing_event/:matricula",
  eventoController.getOngoingEventsByMatricula
);

export { eventoRouter };
