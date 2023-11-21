import express from "express";
import { googleConfig, microsoftConfig, fetchUser } from "../config.js";

// Create an Express router to handle auth routes
export function LoginApi(db) {
  const router = express.Router();

  // Endpoint to get auth config and user info
  router.get("/", async (req, res) => {
    const config = {
      google: await googleConfig(),
      microsoft: await microsoftConfig(),
    };
    const response = { config, user: {} };

    // Check if google/microsoft access tokens in cookies
    const { google_access_token, microsoft_access_token } = req.signedCookies;

    // Fetch user info if available
    if (google_access_token) {
      response.user.google = await fetchUser(
        google_access_token,
        config.google
      );
    }
    if (microsoft_access_token) {
      response.user.microsoft = await fetchUser(
        microsoft_access_token,
        config.microsoft
      );
    }
    res.json(response);
  });

  // Endpoint to store access tokens
  router.post("/:provider", (req, res) => {
    const { provider } = req.params;
    const { access_token } = req.body;
    res.cookie(`${provider}_access_token`, access_token, { signed: true });
    res.sendStatus(200);
  });

  // Combined route for clearing cookies / log out
  router.delete("/", (req, res) => {
    res.clearCookie("google_access_token");
    res.clearCookie("microsoft_access_token");
    res.sendStatus(200);
  });

  return router;
}
