/*
Create controller functions to:

Insert a new destination
Retrieve all destinations
Retrieve a single destination
Update the details for a single destination
Delete a single destination
*/

import { pool } from "../config/database.js";

const createDestination = async (req, res) => {
  const insertQuery = `
    INSERT INTO destinations (name, description, location, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  const { name, description, location, rating } = req.body;

  try {
    const results = await pool.query(insertQuery, [
      name,
      description,
      location,
      rating,
    ]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getDestinations = async (req, res) => {
  const selectQuery = `SELECT * FROM destinations ORDER BY id ASC`;

  try {
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getDestination = async (req, res) => {
  const selectQuery = `SELECT * FROM destinations WHERE id = $1`;

  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(selectQuery, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
    console.log("Unable to get destination");
    console.log("Error:", error.message);
  }
};

const updateDestination = async (req, res) => {
  const updateQuery = `
    UPDATE destinations
    SET name = $1, description = $2, location = $3, rating = $4
    WHERE id = $5`;

  const { name, description, location, rating } = req.body;

  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(updateQuery, [
      name,
      description,
      location,
      rating,
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteDestination = async (req, res) => {
  const deleteQuery = `DELETE FROM destinations WHERE id = $1`;

  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(deleteQuery, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
};
