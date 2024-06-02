import { dbQuery } from "../services/db";

export type Requirements = {
  data: string;
  tmini: string;
  tmfim: string;
  predio?: string;
  andar?: number;
  capacidade?: number;
  recursos?: string;
};

const searchSalas = async (requirements: Requirements) => {};

export const searcherModel = {
  searchSalas,
};
