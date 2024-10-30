import app from "./app.js";
import { initializeDatabase } from "./src/middleware/db.js";
const port = process.env.PORT || 3000;

initializeDatabase()
app.listen(port,'0.0.0.0',() => {
  console.log(`Listening on port ${port}`);
});
