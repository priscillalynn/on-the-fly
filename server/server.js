import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trips.js";
import activitiesRoutes from "./routes/activities.js";
import destinationRoutes from "./routes/destinations.js";
import tripDestinationsRoutes from "./routes/trip_destinations.js";
import passport from "passport";
import session from "express-session";
import githubStrategy from "./config/auth.js";
import authRoutes from "./routes/auth.js";
import userTripRoutes from "./routes/users-trips.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
//updated cors middleware to allow for credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

// express-session middleware to manage user sessions
app.use(
  session({
    secret: "codepath",
    resave: false,
    saveUninitialized: true,
  })
);

// set up passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(githubStrategy);

// set up passport session support
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// create the auth route
app.use("/auth", authRoutes);


app.use("/api/trips", tripRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips-destinations", tripDestinationsRoutes);
app.use("/api/users-trips", userTripRoutes);

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
