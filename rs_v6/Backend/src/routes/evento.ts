import { Router } from "express";
import { eventoController } from "../controllers/evento";

const eventoRouter = Router();

eventoRouter.post("/post_evento", eventoController.insertEvento);

export { eventoRouter };
