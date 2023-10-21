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
    INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const { destination, description, city, country, img_url, flag_img_url } =
    req.body;

  try {
    const results = await pool.query(insertQuery, [
      destination,
      description,
      city,
      country,
      img_url,
      flag_img_url,
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
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(
      "SELECT * FROM destinations WHERE id = $1",
      [id]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateDestination = async (req, res) => {
  const updateQuery = `
    UPDATE destinations
    SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6
    WHERE id = $7
  `;

  const id = parseInt(req.params.id);
  const { destination, description, city, country, img_url, flag_img_url } =
    req.body;

  try {
    const results = await pool.query(updateQuery, [
      destination,
      description,
      city,
      country,
      img_url,
      flag_img_url,
      id,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteDestination = async (req, res) => {
  const deleteQuery = `DELETE FROM destinations WHERE id = $1`;

  try {
    const id = parseInt(req.params.id);

    const results = await pool.query(deleteQuery, [id]);
    res.status(200).json(results.rows[0]);
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
