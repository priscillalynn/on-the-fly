/*
Create controller functions to:

Insert a new activity
Retrieve all activities
Retrieve all activities associated with a specific trip
Update the number of likes for a specific activity
Delete a single activity
*/

import { pool } from "../config/database.js";

const createActivity = async (req, res) => {
  const insertQuery = `
    INSERT INTO activities (name, description, date, trip_id, likes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  const { name, description, date, trip_id, likes } = req.body;

  try {
    const results = await pool.query(insertQuery, [
      name,
      description,
      date,
      trip_id,
      likes,
    ]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getActivities = async (req, res) => {
  const selectQuery = `SELECT * FROM activities ORDER BY id ASC`;

  try {
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getTripActivities = async (req, res) => {
  const selectQuery = `SELECT * FROM activities WHERE trip_id = $1`;

  try {
    const tripId = parseInt(req.params.tripId);
    const results = await pool.query(selectQuery, [tripId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateActivityLikes = async (req, res) => {
  const updateQuery = `
    UPDATE activities
    SET likes = likes + 1
    WHERE id = $1`;

  try {
    const activityId = parseInt(req.params.activityId);
    const results = await pool.query(updateQuery, [activityId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  const deleteQuery = `DELETE FROM activities WHERE id = $1`;

  try {
    const activityId = parseInt(req.params.activityId);
    const results = await pool.query(deleteQuery, [activityId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createActivity,
  getActivities,
  getTripActivities,
  updateActivityLikes,
  deleteActivity,
};
