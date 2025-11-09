const mariadb = require("mariadb");

const db = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Connected to MariaDB Database");
    conn.release(); // return connection to pool
  } catch (err) {
    console.error("❌ Error connecting to MariaDB:", err);
  }
})();

module.exports = db; //Export as db
