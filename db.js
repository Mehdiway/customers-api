const mysql = require("mysql");

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbDatabase = process.env.DB_DATABASE;

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbDatabase,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to database");
});

module.exports = connection;
