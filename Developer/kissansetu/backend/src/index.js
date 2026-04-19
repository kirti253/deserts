import dotenv from "dotenv";
import app from "./app.js";
import { initDb } from "./db/initDb.js";

dotenv.config();

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    await initDb();

    app.listen(port, () => {
      console.log(`Farmer Direct Market backend running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

startServer();
