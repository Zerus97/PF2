import { Router } from "express";
import { eventoController } from "../controllers/evento";

const eventoRouter = Router();

eventoRouter.post("/post_evento", eventoController.insertEvento);
eventoRouter.get("/available_salas", eventoController.getAvailableSalas);

export { eventoRouter };
