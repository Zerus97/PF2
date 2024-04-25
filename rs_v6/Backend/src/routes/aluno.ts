import { Router } from "express";
import { alunoController } from "../controllers/aluno";

const alunoRouter = Router();

alunoRouter.post("/", alunoController.insertAluno);
export { alunoRouter };
