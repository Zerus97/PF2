import { Router } from "express";
import { alunoController } from "../controllers/aluno";

const alunoRouter = Router();

alunoRouter.post("/post", alunoController.insertAluno);
alunoRouter.get("/login", alunoController.login);
export { alunoRouter };
