import db from "./SqliteDatabase";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS package (id INTEGER PRIMARY KEY AUTOINCREMENT, qrCode TEXT);"
  );
});

const insert = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO package (qrCode) values (?);",
        [obj.qrCode],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj));
        },
        (error) => reject(error)
      );
    });
  });
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM package;",
        [],
        (_, { rows }) => resolve(rows._array),
        (error) => reject(error)
      );
    });
  });
};
const deleteAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM package;",
        [],
        (_, { rowsAffected }) => {
          if (rowsAffected >= 0) resolve(rowsAffected);
          else reject("Error deleting data");
        },
        (error) => reject(error)
      );
    });
  });
};

export default {
  insert,
  findAll,
  deleteAll,
};
