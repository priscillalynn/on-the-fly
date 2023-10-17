import { pool } from "../config/database.js";

const createTrip = async (req, res) => {
  const insertQuery = `
    INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;

  const {
    title,
    description,
    img_url,
    num_days,
    start_date,
    end_date,
    total_cost
  } = req.body;

  try {
    const results = await pool.query(insertQuery, [
      title,
      description,
      img_url,
      num_days,
      start_date,
      end_date,
      total_cost
    ]);

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//retrieving all trips
const getTrips = async (req, res) => {
  const selectQuery = `SELECT * FROM trips ORDER BY id ASC`;

  try {
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//retrieve a trip by its id
const getTrip = async (req, res) => {
  const selectQuery = `SELECT * FROM trips WHERE id = $1`;

  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(selectQuery, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
    console.log("Unable to get trip");
    console.log("Error:", error.message);
  }
};

//updating a trip
const updateTrip = async (request, response) => {
  const updateQuery = `
    UPDATE trips
    SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost= $7
    WHERE id = $8',
    `;

  const {
    title,
    description,
    img_url,
    num_days,
    start_date,
    end_date,
    total_cost
  } = req.body;

  try {
    const id = parseInt(req.params.id);

    const results = await pool.query(updateQuery, [
      title,
      description,
      img_url,
      num_days,
      start_date,
      end_date,
      total_cost,
      id
    ]);

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//deleting a trip
const deleteTrip = async (req, res) => {
  const deleteQuery = `
    DELETE FROM activities
    WHERE trip_id = $1`;

  try {
    const id = parseInt(req.params.id);

    const results = await pool.query(deleteQuery, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip
};
