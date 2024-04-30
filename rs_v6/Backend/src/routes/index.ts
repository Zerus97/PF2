import { Application, Router } from "express";
import { alunoRouter } from "./aluno";
import { predioRouter } from "./predio";
import { salaRouter } from "./sala";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use("/aluno", alunoRouter);
  apiRouter.use("/predio", predioRouter);
  apiRouter.use("/sala", salaRouter);
  app.use("/api/v1", apiRouter);
};
