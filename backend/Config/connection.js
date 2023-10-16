const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "mysql-150526-0.cloudclusters.net",
  user: "admin",
  password: "ckYYWSE8",
  database: "sql10653411",
  connectTimeout: 50000,
  port: 12759,
});

connection.connect((err) => {
  console.log(err);
  if (err) throw err;
});

module.exports = connection;
