import { Request, Response } from "express";
import { badRequest, internalServerError } from "../services/utils";
import { salaRecursoModel } from "../models/sala_recurso";
import { salaModel } from "../models/sala";
import { eventoModel } from "../models/evento";

const searchSalas = async (req: Request, res: Response) => {
  try {
    const { recursos, capacidade, date, tmini, tmfim, predio } = req.body;

    let result1: string[] = [];
    let result2: string[] = [];
    let result3: string[] = [];
    let result4: string[] = [];

    if (recursos) {
      const recursosArray = Array.isArray(recursos) ? recursos : [recursos];
      result1 = await salaRecursoModel.getSalaByRecursos(recursosArray);
    }

    if (capacidade) {
      result2 = await salaModel.getSalaCapacidade(capacidade);
    }

    result3 = await eventoModel.getAvailableSalas(date, tmini, tmfim);
    let intersection: string[] = [];
    if (recursos.length == 0 && !capacidade) {
      intersection = result3;
    } else if (recursos.length == 0) {
      intersection = result2.filter((value) => result3.includes(value));
    } else if (!capacidade) {
      intersection = result1.filter((value) => result3.includes(value));
    } else {
      intersection = result1.filter(
        (value) => result2.includes(value) && result3.includes(value)
      );
    }
    if (predio) {
      result4 = await salaModel.getSala([predio, "-1", "-1"]);
      intersection = intersection.filter((value) => result4.includes(value));
    }

    return res.json(intersection);
  } catch (error) {
    return internalServerError(res, error as Error);
  }
};

export const searcherController = {
  searchSalas,
};
