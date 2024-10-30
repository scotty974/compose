import express from "express";
import cors from "cors";
import { pool } from "./src/middleware/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Route pour l'inscription des utilisateurs
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Validation des champs
  if (!username || !email || !password) {
    return res.status(400).send("Veuillez renseigner tous les champs");
  }

  // Insertion dans la base de données avec les placeholders de PostgreSQL
  pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de l'inscription");
      }
      return res.status(200).send("Inscription réussie");
    }
  );
});


// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
    return res.status(200).send(result.rows);
  });
});

// Exporter l'application
export default app;
