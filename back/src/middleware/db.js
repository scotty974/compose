import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  user: "root",
  host: "db",
  database: "compose",
  password: "root",
  port: 5432,
});

function initializeDatabase() {
  pool.connect((err) => {
    if (err) {
      console.error("Erreur de connexion à la base de données :", err.stack);
    } else {
      pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error("Erreur lors de la création de la table :", err.stack);
        } else {
          console.log("Table 'users' prête.");
        }
      });
    }
  });
}

export { pool, initializeDatabase };
