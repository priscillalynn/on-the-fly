import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trips.js";
import activitiesRoutes from "./routes/activities.js";
import destinationRoutes from "./routes/destinations.js";
import tripDestinationsRoutes from "./routes/trip_destinations.js";


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); 
app.use(cors());

app.use("/api/trips", tripRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips-destinations", tripDestinationsRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>'
    );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
