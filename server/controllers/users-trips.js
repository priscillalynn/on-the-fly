import { pool } from "../config/database.js";

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    githubid int NOT NULL,
    username varchar(200) NOT NULL,
    avatarurl varchar(500),
    accesstoken varchar(500) NOT NULL
);
`;

const createUsersTripsTableQuery = `
CREATE TABLE IF NOT EXISTS users_trips (
    id serial PRIMARY KEY,
    trip_id int NOT NULL,
    username text NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);
`;

pool.query(createUsersTableQuery, (error, res) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("✅ users table created successfully!");
});

pool.query(createUsersTripsTableQuery, (error, res) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("✅ users_trips table created successfully!");
});

export const createTripUser = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);
    const { username } = req.body;

    const results = await pool.query(
      `
            INSERT INTO users_trips (trip_id, username)
            VALUES($1, $2)
            RETURNING *`,
      [trip_id, username]
    );

    res.status(200).json(results.rows[0]);

    console.log("🆕 added user to trip");
  } catch (error) {
    res.status(409).json({ error: error.message });
    console.log("Error:", error.message);
  }
};

export const getTripUsers = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);
    const results = await pool.query(
      "SELECT * FROM users_trips WHERE trip_id = $1",
      [trip_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
    console.log(
      "🚫 unable to GET all users (travelers) - Error:",
      error.message
    );
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const username = req.params.username;
    const results = await pool.query(
      `
            SELECT t.* FROM users_trips ut, trips t
            WHERE ut.trip_id = t.id
            AND ut.username = $1`,
      [username]
    );

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
    console.log("🚫 unable to GET users trips = Error:", error.message);
  }
};
