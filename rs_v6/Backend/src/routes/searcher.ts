import { Router } from "express";
import { searcherController } from "../controllers/searcher";

const searcherRouter = Router();

searcherRouter.post("/", searcherController.searchSalas);
export { searcherRouter };
