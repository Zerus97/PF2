import { Router } from "express";
import { searcherController } from "../controllers/searcher";

const searcherRouter = Router();

searcherRouter.get("/", searcherController.searchSalas);
searcherRouter.post("/", searcherController.searchSalas2);
export { searcherRouter };
