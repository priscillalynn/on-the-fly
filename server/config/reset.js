/*
import { pool } from "./database.js";
import "./dotenv.js";
import { tripsData, destinationsData, activitiesData, usersData, tripsUsersData, tripsDestinationsData } from "./data/data.js";

const createTripsTable = async () => {
  const createTripsTableQuery = `
      CREATE TABLE IF NOT EXISTS trips (
          id                serial PRIMARY KEY,
          title             varchar(100) NOT NULL UNIQUE,
          description       varchar(500) NOT NULL,
          img_url           text NOT NULL,
          num_days          integer NOT NULL,
          start_date        date NOT NULL,
          end_date          date NOT NULL,
          total_cost        money NOT NULL
      );
  `;

  try {
    const res = await pool.query(createTripsTableQuery);
    console.log("🎉 trips table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips table", err);
  }
};

const seedTripsTable = async () => {
  // create the table
  await createTripsTable();

  const insertQuery = `
    INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  // insert the individual rows
  tripsData.forEach(trip => {
    const values = [
      trip.title,
      trip.description,
      trip.img_url,
      trip.num_days,
      trip.start_date,
      trip.end_date,
      trip.total_cost
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting trip", err);
        return;
      }

      console.log(`✅ ${trip.title} added successfully`);
    });
  });
};

const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS destinations (
        id                serial PRIMARY KEY,
        destination       varchar(100) NOT NULL,
        description       varchar(500) NOT NULL,
        city              varchar(100) NOT NULL,
        country           varchar(100) NOT NULL,
        img_url           text NOT NULL,
        flag_img_url      text NOT NULL
    );
  `;

  try {
    const res = await pool.query(createDestinationsTableQuery);
    console.log("🎉 destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating destinations table", err);
  }
};

const seedDestinationsTable = async () => {
  //create the table
  await createDestinationsTable();

  const insertDestinationsQuery = `
    INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  try {
    for (const destination of destinationsData) {
      const values = [
        destination.destination,
        destination.description,
        destination.city,
        destination.country,
        destination.img_url,
        destination.flag_img_url,
      ];
      await pool.query(insertDestinationsQuery, values);
    }
    console.log("🎉 destinations table seeded successfully");
  } catch (err) {
    console.error("⚠️ error seeding destinations table", err);
  }
};

const createActivitiesTable = async () => {
  const createActivitiesTableQuery = `
    CREATE TABLE IF NOT EXISTS activities (
        id              serial PRIMARY KEY,
        trip_id         int NOT NULL,
        activity        varchar(100) NOT NULL,
        num_votes       integer DEFAULT 0,
        FOREIGN KEY(trip_id) REFERENCES trips(id)
    );
    `;

  try {
    const res = await pool.query(createActivitiesTableQuery);
    console.log("🎉 activities table created successfully");
  } catch (err) {
    console.error("⚠️ error creating activities table", err);
  }
};

const seedActivitiesTable = async () => {
  // create the table
  await createActivitiesTable();

  // insert the individual rows
  const createActivitiesTableQuery = `
    CREATE TABLE IF NOT EXISTS activities (
        id              serial PRIMARY KEY,
        trip_id         int NOT NULL,
        activity        varchar(100) NOT NULL,
        description     varchar(500) NOT NULL,
        date            date NOT NULL,
        likes           integer DEFAULT 0,
        FOREIGN KEY(trip_id) REFERENCES trips(id)
    );
  `;

  try {
    await pool.query(createActivitiesTableQuery);
    console.log("🎉 activities table created successfully");

    const insertActivitiesQuery = `
      INSERT INTO activities (trip_id, activity, description, date, likes)
      VALUES ($1, $2, $3, $4, $5)
    `;

    activitiesData.forEach((activity) => {
      const values = [
        activity.trip_id,
        activity.activity,
        activity.description,
        activity.date,
        activity.likes,
      ];

      pool.query(insertActivitiesQuery, values, (err, res) => {
        if (err) {
          console.error("⚠️ error inserting activity", err);
          return;
        }

        console.log(`✅ Activity '${activity.name}' added successfully`);
      });
    });
  } catch (err) {
    console.error("⚠️ error creating activities table", err);
  }
};

const createTripsDestinationsTable = async () => {
  const createTripsDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS trips_destinations (
        trip_id             int NOT NULL,
        destination_id      int NOT NULL,
        PRIMARY KEY (trip_id, destination_id),
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
        FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
    );
    `;

  try {
    const res = await pool.query(createTripsDestinationsTableQuery);
    console.log("🎉 trips_destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips_destinations table", err);
  }
};

const seedTripsDestinationsTable = async () => {
  // create the table
  await createTripsDestinationsTable();

  const seedTripsDestinationsTableQuery = `
    INSERT INTO trips_destinations (trip_id, destination_id)
    VALUES ($1, $2);
  `;

  try {
    // Loop through each trip and destination combination and insert into the trips_destinations table
    for (const tripDestination of tripsDestinationsData) {
      const values = [tripDestination.trip_id, tripDestination.destination_id];
      await pool.query(seedTripsDestinationsTableQuery, values);
    }
    console.log("🎉 trips_destinations table seeded successfully");
  } catch (err) {
    console.error("⚠️ error seeding trips_destinations table", err);
  }
};

const createUsersTable = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id                serial PRIMARY KEY,
        user_id          integer NOT NULL,
        username          varchar(100) NOT NULL,
        avatarurl         varchar(500) NOT NULL,
    );
  `;

  try {
    const res = await pool.query(createUsersTableQuery);
    console.log("🎉 users table created successfully");
  } catch (err) {
    console.error("⚠️ error creating users table", err);
  }
};

const seedUsersTable = async () => {
  // create the table
  await createUsersTable();

  const seedUsersTableQuery = `
    INSERT INTO users (user_id, username, avatarurl)
    VALUES ($1, $2, $3, $4);
  `;

  try {
    // Loop through each user and insert into the users table
    for (const user of usersData) {
      const values = [user.user_id, user.username, user.avatarurl];
      await pool.query(seedUsersTableQuery, values);
    }
    console.log("🎉 users table seeded successfully");
  } catch (err) {
    console.error("⚠️ error seeding users table", err);
  }
};

const createTripsUsersTable = async () => {
  const createTripsUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS trips_users (
          trip_id int NOT NULL,
          user_id int NOT NULL,
          PRIMARY KEY (trip_id, user_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
      );
  `;
  try {
    const res = await pool.query(createTripsUsersTableQuery);
    console.log("🎉 trips_users table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips_users table", err);
  }
};

const seedTripsUsersTable = async () => {
  // create the table
  await createTripsUsersTable();

  const seedTripsUsersTableQuery = `
    INSERT INTO trips_users (trip_id, user_id)
    VALUES ($1, $2);
  `;

  try {
    // Loop through each trip and user combination and insert into the trips_users table
    for (const tripUser of tripsUsersData) {
      const values = [tripUser.trip_id, tripUser.user_id];
      await pool.query(seedTripsUsersTableQuery, values);
    }
    console.log("🎉 trips_users table seeded successfully");
  } catch (err) {
    console.error("⚠️ error seeding trips_users table", err);
  }
};

// run the functions
await seedTripsTable();
await seedDestinationsTable();
await seedTripsDestinationsTable();
await seedActivitiesTable();
await seedUsersTable();
await seedTripsUsersTable();
*/

import { pool } from "./database.js";
import "./dotenv.js";
import { tripsData } from "./data/data.js";

const createTripsTable = async () => {
  const createTripsTableQuery = `
      CREATE TABLE IF NOT EXISTS trips (
          id                serial PRIMARY KEY,
          title             varchar(100) NOT NULL UNIQUE,
          description       varchar(500) NOT NULL,
          img_url           text NOT NULL,
          num_days          integer NOT NULL,
          start_date        date NOT NULL,
          end_date          date NOT NULL,
          total_cost        money NOT NULL
      );
  `;

  try {
    const res = await pool.query(createTripsTableQuery);
    console.log("🎉 trips table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips table", err);
  }
};

const seedTripsTable = async () => {
  // create the table
  await createTripsTable();

  const insertQuery = `
    INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  // insert the individual rows
  tripsData.forEach((trip) => {
    const values = [
      trip.title,
      trip.description,
      trip.img_url,
      trip.num_days,
      trip.start_date,
      trip.end_date,
      trip.total_cost,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting trip", err);
        return;
      }

      console.log(`✅ ${trip.title} added successfully`);
    });
  });
};

const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS destinations (
        id                serial PRIMARY KEY,
        destination       varchar(100) NOT NULL,
        description       varchar(500) NOT NULL,
        city              varchar(100) NOT NULL,
        country           varchar(100) NOT NULL,
        img_url           text NOT NULL,
        flag_img_url      text NOT NULL
    );
  `;

  try {
    const res = await pool.query(createDestinationsTableQuery);
    console.log("🎉 destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating destinations table", err);
  }
};

const createActivitiesTable = async () => {
  const createActivitiesTableQuery = `
    CREATE TABLE IF NOT EXISTS activities (
        id              serial PRIMARY KEY,
        trip_id         int NOT NULL,
        activity        varchar(100) NOT NULL,
        num_votes       integer DEFAULT 0,
        FOREIGN KEY(trip_id) REFERENCES trips(id)
    );
    `;

  try {
    const res = await pool.query(createActivitiesTableQuery);
    console.log("🎉 activities table created successfully");
  } catch (err) {
    console.error("⚠️ error creating activities table", err);
  }
};

const createTripsDestinationsTable = async () => {
  const createTripsDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS trips_destinations (
        trip_id             int NOT NULL,
        destination_id      int NOT NULL,
        PRIMARY KEY (trip_id, destination_id),
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
        FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
    );
    `;

  try {
    const res = await pool.query(createTripsDestinationsTableQuery);
    console.log("🎉 trips_destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips_destinations table", err);
  }
};

const createUsersTable = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id                serial PRIMARY KEY,
        githubid          integer NOT NULL,
        username          varchar(100) NOT NULL,
        avatarurl         varchar(500) NOT NULL,
        accesstoken       varchar(500) NOT NULL
    );
  `;

  try {
    const res = await pool.query(createUsersTableQuery);
    console.log("🎉 users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating users table", err);
  }
};

const createTripsUsersTable = async () => {
  const createTripsUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS trips_users (
          trip_id int NOT NULL,
          user_id int NOT NULL,
          PRIMARY KEY (trip_id, user_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
      );
  `;
  try {
    const res = await pool.query(createTripsUsersTableQuery);
    console.log("🎉 trips_users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating trips_users table", err);
  }
};

await seedTripsTable();
await createDestinationsTable();
await createActivitiesTable();
await createTripsDestinationsTable();
await createUsersTable();
await createTripsUsersTable();
