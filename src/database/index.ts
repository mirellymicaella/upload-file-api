import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Database connection has been established successfully.');
});

export {connection};