import { Application, Router } from "express";
import { alunoRouter } from "./aluno";
import { predioRouter } from "./predio";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use("/aluno", alunoRouter);
  apiRouter.use("/predio", predioRouter);
  app.use("/api/v1", apiRouter);
};
