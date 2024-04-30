import { Router } from "express";
import { salaController } from "../controllers/sala";

const salaRouter = Router();

salaRouter.post("/post", salaController.insertsala);
export { salaRouter };
