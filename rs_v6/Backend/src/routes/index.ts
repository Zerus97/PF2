import { Application, Router } from "express";
import { alunoRouter } from "./aluno";
import { predioRouter } from "./predio";
import { salaRouter } from "./sala";
import { recursoRouter } from "./recurso";
import { salaRecursoRouter } from "./sala_recurso";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use("/aluno", alunoRouter);
  apiRouter.use("/predio", predioRouter);
  apiRouter.use("/sala", salaRouter);
  apiRouter.use("/recurso", recursoRouter)
  apiRouter.use("/sala_recurso", salaRecursoRouter)
  app.use("/api/v1", apiRouter);
};
