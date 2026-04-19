import { pool } from "../db/pool.js";

export async function registerUser(req, res, next) {
  try {
    const { name, phone, role } = req.body;
    const normalizedRole = role?.trim().toLowerCase();

    if (!name || !phone || !role) {
      return res.status(400).json({ message: "Name, phone, and role are required." });
    }

    if (normalizedRole !== "farmer" && normalizedRole !== "buyer") {
      return res.status(400).json({ message: "Role must be either farmer or buyer." });
    }

    const query = `
      INSERT INTO users (name, phone, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (phone)
      DO UPDATE SET
        name = EXCLUDED.name,
        role = EXCLUDED.role
      RETURNING id, name, phone, role, created_at AS "createdAt";
    `;

    const { rows } = await pool.query(query, [name.trim(), phone.trim(), normalizedRole]);

    return res.status(200).json(rows[0]);
  } catch (error) {
    return next(error);
  }
}
