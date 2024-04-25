import sqlite3 from "sqlite3";

//const DATABASE_FILE = process.env.DATABASE_FILE;
const DATABASE_FILE = "//rs_v6//Backend//my_data.db";
if (!DATABASE_FILE) throw new Error("DATABASE_FILE não informado");

export const openConnection = () => {
  let db = new sqlite3.Database("rs_v6\\Backend\\my_data.db");
  return db;
};

export const dbQuery = (query: string, params?: any[]) => {
  let db = openConnection();
  return new Promise<any[]>((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  }).finally(() => {
    db.close();
  });
};
