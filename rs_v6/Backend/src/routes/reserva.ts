import { Router } from "express";
import { reservaController } from "../controllers/reserva";

const reservaRouter = Router();

reservaRouter.post("/post", reservaController.insertReserva);

export { reservaRouter };
