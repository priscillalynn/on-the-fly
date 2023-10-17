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

router.get("/destinations", DestinationsController.getDestinations);
router.get("/destinations/:id", DestinationsController.getDestination);
router.post("/destinations", DestinationsController.createDestination);
router.delete("/destinations/:id", DestinationsController.deleteDestination);
router.patch("/destinations/:id", DestinationsController.updateDestination);

export default router;
