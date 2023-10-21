/*
Create route handlers for the following endpoints:

GET requests at /destinations that calls the getDestinations function
GET requests at /destinations/:id that calls the getDestination function
POST requests at /destinations that calls the createDestination function
DELETE requests at /destinations/:id that calls the deleteDestination function
PATCH requests at /destinations/:id that calls the updateDestination function
*/

import express from "express";
import DestinationsController from "../controllers/destinations.js";

const router = express.Router();

router.get("/", DestinationsController.getDestinations);
router.get("/:id", DestinationsController.getDestination);
router.post("/", DestinationsController.createDestination);
router.delete("/:id", DestinationsController.deleteDestination);
router.patch("/:id", DestinationsController.updateDestination);

export default router;
