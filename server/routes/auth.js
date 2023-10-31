import express from "express";
import passport from "passport";

// create express router
const router = express.Router();

// create the login success route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  }
});

// create the login failure route
router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: true, message: "failure" });
});

// create the logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      res.clearCookie("connect.sid");

      res.json({ status: "logout", user: {} });
    });
  });
});


// create the github auth route
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["read:user"],
  })
);

// create the github auth callback route
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/destinations",
  })
);

export default router;