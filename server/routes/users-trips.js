import express from "express";
import {
  createTripUser,
  getTripUsers,
  getUserTrips,
} from "../controllers/users-trips.js";

const router = express.Router();

router.post("/api/create/:trip_id", createTripUser);
router.get("/api/users/:trip_id", getTripUsers);
router.get("/api/trips/:username", getUserTrips);

export default router;
