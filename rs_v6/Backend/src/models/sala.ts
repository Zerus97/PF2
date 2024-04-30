import { dbQuery } from "../services/db";

export type Sala = {
    sala_id: string;
    predio: string;
    andar: number;
    numero: number
  }