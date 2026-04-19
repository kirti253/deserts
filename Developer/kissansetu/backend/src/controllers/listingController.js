import { pool } from "../db/pool.js";

function mapListing(row) {
  return {
    id: row.id,
    sellerId: row.seller_id,
    farmerName: row.farmer_name,
    cropName: row.crop_name,
    price: Number(row.price),
    quantity: row.quantity,
    location: row.location,
    contactNumber: row.contact_number,
    createdAt: row.created_at
  };
}

export async function getListings(req, res, next) {
  try {
    const { search = "", location = "", farmerPhone = "" } = req.query;
    const conditions = [];
    const values = [];

    if (search) {
      values.push(`%${search.trim()}%`);
      conditions.push(`crop_name ILIKE $${values.length}`);
    }

    if (location) {
      values.push(`%${location.trim()}%`);
      conditions.push(`location ILIKE $${values.length}`);
    }

    if (farmerPhone) {
      values.push(farmerPhone.trim());
      conditions.push(`contact_number = $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `
      SELECT id, seller_id, farmer_name, crop_name, price, quantity, location, contact_number, created_at
      FROM crop_listings
      ${whereClause}
      ORDER BY created_at DESC;
    `;

    const { rows } = await pool.query(query, values);

    return res.status(200).json(rows.map(mapListing));
  } catch (error) {
    return next(error);
  }
}

export async function createListing(req, res, next) {
  try {
    const { farmerName, cropName, price, quantity, location, contactNumber } = req.body;
    const numericPrice = Number(price);

    if (!farmerName || !cropName || !price || !quantity || !location || !contactNumber) {
      return res.status(400).json({ message: "All listing fields are required." });
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Price must be a valid positive number." });
    }

    const userResult = await pool.query(
      `
        SELECT id
        FROM users
        WHERE phone = $1
        LIMIT 1;
      `,
      [contactNumber.trim()]
    );

    const sellerId = userResult.rows[0]?.id ?? null;

    const query = `
      INSERT INTO crop_listings (
        seller_id,
        farmer_name,
        crop_name,
        price,
        quantity,
        location,
        contact_number
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, seller_id, farmer_name, crop_name, price, quantity, location, contact_number, created_at;
    `;

    const values = [
      sellerId,
      farmerName.trim(),
      cropName.trim(),
      numericPrice,
      quantity.trim(),
      location.trim(),
      contactNumber.trim()
    ];

    const { rows } = await pool.query(query, values);

    return res.status(201).json(mapListing(rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function deleteListing(req, res, next) {
  try {
    const { id } = req.params;
    const contactNumber = req.query.contactNumber || req.body?.contactNumber;

    if (!contactNumber) {
      return res.status(400).json({ message: "Contact number is required to delete a listing." });
    }

    const query = `
      DELETE FROM crop_listings
      WHERE id = $1 AND contact_number = $2
      RETURNING id;
    `;

    const { rowCount } = await pool.query(query, [Number(id), String(contactNumber).trim()]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Listing not found or you are not allowed to delete it." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
}
