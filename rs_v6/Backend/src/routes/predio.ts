import { Router } from "express";
import { predioController } from "../controllers/predio";

const predioRouter = Router();

predioRouter.post("/post", predioController.insertPredio);
predioRouter.get("/get", predioController.getPredios);
export { predioRouter };
