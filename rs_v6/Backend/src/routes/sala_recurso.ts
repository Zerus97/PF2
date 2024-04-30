import { Router } from "express";
import { salaRecursoController } from "../controllers/sala_recurso";

const salaRecursoRouter = Router();

salaRecursoRouter.post("/post", salaRecursoController.insertSalaRecurso);
salaRecursoRouter.get("/get/:sala_id", salaRecursoController.getSalaRecursos);

export { salaRecursoRouter };
