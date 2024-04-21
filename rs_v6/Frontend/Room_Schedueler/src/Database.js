import SQLite from "react-native-sqlite-storage";

const database = SQLite.openDatabase(
  { name: "database.db", location: "default" },
  console.log("Sucess creating db!"),
  (error) => {
    console.error("Erro ao abrir o banco de dados:", error);
  }
);

export default database;
