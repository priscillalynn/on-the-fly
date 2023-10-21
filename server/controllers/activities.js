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
    INSERT INTO activities (activity, trip_id)
    VALUES($1, $2)
    RETURNING *`;

  try {
    const trip_id = parseInt(req.params.trip_id);
    const { activity } = req.body;

    const results = await pool.query(insertQuery, [activity, trip_id]);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getActivities = async (req, res) => {
  const selectQuery = `
  SELECT *
  FROM activities
  ORDER BY id ASC`;

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
    const trip_id = parseInt(req.params.trip_id);
    const results = await pool.query(selectQuery, [trip_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateActivityLikes = async (req, res) => {
  const updateLikeQuery = `
    UPDATE activities
    SET num_votes = $1
    WHERE id = $2
  `;

  const { num_votes } = req.body;

  try {
    const id = parseInt(req.params.id);
    const newVotes = parseInt(num_votes);

    const results = await pool.query(updateLikeQuery, [newVotes, id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  const deleteQuery = `
    DELETE FROM activities
    WHERE id = $1
  `;

  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(deleteQuery, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getActivities,
  getTripActivities,
  createActivity,
  deleteActivity,
  updateActivityLikes,
};
