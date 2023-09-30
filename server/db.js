import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "patient_db",
    port:3307
})
    

db.connect((err) => {
    if (err) throw err.message;
    console.log("Connected!");
  });
  