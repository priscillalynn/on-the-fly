/*
Create route handlers for the following endpoints:

GET requests at /activities that calls the getActivities function
GET requests at /activities/:trip_id that calls the getTripActivities function
POST requests at /activities/:trip_id that calls the createActivity function
DELETE requests at /activities/:id that calls the deleteActivity function
PATCH requests at /activities/:id that calls the updateActivityLikes function
*/ 

import express from "express";
import ActivitiesController from "../controllers/activities.js";

const router = express.Router();

router.get("/activities", ActivitiesController.getActivities);
router.get("/activities/:trip_id", ActivitiesController.getTripActivities);
router.post("/activities/:trip_id", ActivitiesController.createActivity);
router.delete("/activities/:id", ActivitiesController.deleteActivity);
router.patch("/activities/:id", ActivitiesController.updateActivityLikes);

export default router;
