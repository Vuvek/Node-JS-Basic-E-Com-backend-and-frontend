import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.log("Error : ", err);
  } else {
    console.log("Connected Successfully");
  }
});

export default connection;
