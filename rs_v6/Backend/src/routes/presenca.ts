import { Router } from "express";
import { presencaController } from "../controllers/presenca";

const presencaRouter = Router();

presencaRouter.post("/post_presenca", presencaController.insertPresenca);

export { presencaRouter };
