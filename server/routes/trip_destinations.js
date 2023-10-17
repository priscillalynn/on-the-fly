/*
Create route handlers for the following endpoints:

GET requests at / that calls the getTripsDestinations function
GET requests at /trips/:destination_id that calls the getAllTrips function
GET requests at /destinations/:trip_id that calls the getAllDestinations function
POST requests at / that calls the createTripDestination function
*/

import express from "express";
import TripDestinationsController from "../controllers/trip_destinations.js";

const router = express.Router();

router.get("/", TripDestinationsController.getTripsDestinations);
router.get("/trips/:destination_id", TripDestinationsController.getAllTrips);
router.get(
  "/destinations/:trip_id",
  TripDestinationsController.getAllDestinations
);
router.post("/", TripDestinationsController.createTripDestination);

export default router;
