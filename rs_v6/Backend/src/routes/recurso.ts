import { Router } from "express";
import { recursoController } from "../controllers/recurso";

const recursoRouter = Router();

recursoRouter.post("/post", recursoController.insertRecurso);
recursoRouter.get("/getAll", recursoController.getAllRecursos);

export { recursoRouter };
