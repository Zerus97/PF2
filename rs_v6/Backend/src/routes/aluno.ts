import { Router } from "express";
import { alunoController } from "../controllers/aluno";

const alunoRouter = Router();

alunoRouter.post("/post_aluno", alunoController.insertAluno);
alunoRouter.post("/login", alunoController.login);
export { alunoRouter };
