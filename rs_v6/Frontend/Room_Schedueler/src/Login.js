import database from "./database";

const createTable = () => {
  database.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Users " +
        "matricula INTEGER PRIMARY KEY, " +
        "senha INTEGER"
    );
  });
};
createTable();

export default function verifyUser(username, password) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT matricula FROM Users WHERE matricula = ? AND senha = ?",
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            // User found
            resolve(true);
          } else {
            // User not found
            resolve(false);
          }
        },
        (_, error) => {
          // Error occurred
          console.error("Error verifying user:", error);
          reject(error); // Reject with error
        }
      );
    });
  });
}
