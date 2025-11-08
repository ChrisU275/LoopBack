const mariadb = require("mariadb");

const db = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  else {
    console.log("✅ Connected to MySQL Database");
  }
});

module.exports = db; //Export as db
