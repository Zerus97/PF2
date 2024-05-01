import { Router } from "express";
import { salaRecursoController } from "../controllers/sala_recurso";

const salaRecursoRouter = Router();

salaRecursoRouter.post("/post", salaRecursoController.insertSalaRecurso);
salaRecursoRouter.get("/get/:sala_id", salaRecursoController.getSalaRecursos);
salaRecursoRouter.get("/getByRecursos", salaRecursoController.getSalaByRecursos); // Exemplo: http://localhost:8091/api/v1/sala_recurso/getByRecursos?recursos=Notebook&recursos=Projetor
export { salaRecursoRouter };