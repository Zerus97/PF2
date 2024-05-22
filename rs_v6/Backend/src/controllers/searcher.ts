import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { searcherModel, Requirements } from "../models/sercher";

const searchSalas = (req: Request, res: Response) => {};

export const searcherController = {
  searchSalas,
};
