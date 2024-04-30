import { Router } from "express";
import { salaController } from "../controllers/sala";

const salaRouter = Router();

salaRouter.post("/post_sala", salaController.insertsala);
export { salaRouter };
