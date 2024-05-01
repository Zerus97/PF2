import express from "express";
import { salaController } from "../controllers/sala";

const salaRouter = express.Router();

salaRouter.post("/post", salaController.insertSala);
salaRouter.get("/predio/:predio/andar/:andar", salaController.getSala);

export  { salaRouter };
