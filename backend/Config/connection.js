const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "hyperloop.c15ujyuuwji7.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Pabbu123",
  database: "sql10653411",
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
