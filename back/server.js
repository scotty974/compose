import app from "./app.js";
import { initializeDatabase } from "./src/middleware/db.js";
const port = process.env.PORT || 3000;

initializeDatabase()
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
