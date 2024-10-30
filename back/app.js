import express from "express";
import cors from "cors";
import { pool } from "./src/middleware/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des utilisateurs");
    }
    return res.status(200).send(result.rows);
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM users WHERE id = $1", [id], (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("Erreur lors de la suppression de l'utilisateur");
    }
    return res.status(200).send("Utilisateur supprimé");
  });
});
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  pool.query(
    "UPDATE users SET username = $1 WHERE id = $2",
    [username, id],
    (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Erreur lors de la mise à jour de l'utilisateur");
      }
      return res.status(200).send("Utilisateur mis à jour");
    }
  );
});
// Exporter l'application
export default app;
