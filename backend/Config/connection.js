const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "sql10.freemysqlhosting.net",
  user: "sql10653411",
  password: "H3x9WT2bBX",
  database: "sql10653411",
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
