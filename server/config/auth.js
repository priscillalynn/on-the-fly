import { Strategy as GitHubStrategy } from "passport-github2";
import { pool } from "./database.js";

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback",
};

const verify = async (accessToken, refreshToken, profile, callback) => {
  const { id, login, avatar_url } = profile._json;

  const userData = {
    githubId: id,
    username: login,
    avatarUrl: avatar_url,
    accessToken,
  };

  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [userData.username]
    );

    const user = results.rows[0];

    if (!user) {
      const insertResult = await pool.query(
        `INSERT INTO users (githubid, username, avatarurl, accesstoken)
         VALUES($1, $2, $3, $4)
         RETURNING *`,
        [userData.githubId, userData.username, userData.avatarUrl, accessToken]
      );

      const newUser = insertResult.rows[0];
      return callback(null, newUser);
    }

    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

const githubStrategy = new GitHubStrategy(options, verify);

export default githubStrategy;
