import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { useRoutes } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";


const PORT = 8091;

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));
useRoutes(app);

app.get("/", (req: Request, res: Response) => res.json({ msg: "ok" }));

app.listen(PORT, () => console.log("Server up at " + PORT));
