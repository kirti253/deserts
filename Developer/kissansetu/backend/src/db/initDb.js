import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./pool.js";

export async function initDb() {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const schemaPath = path.resolve(currentDirectory, "../../sql/schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");

  await pool.query(schemaSql);
}
