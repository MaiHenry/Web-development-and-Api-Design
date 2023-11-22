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
  router.post("/:provider", async (req, res) => {
    const { provider } = req.params;
    const { access_token } = req.body;
    try {
      let config;
      if (provider === "google") {
        config = await googleConfig();
      } else if (provider === "microsoft") {
        config = await microsoftConfig();
      } else {
        throw new Error("no provider");
      }
      const userProfile = await fetchUser(access_token, config);
      const { name, email } = userProfile;
      let user = await db.collection("users").findOne({ email: email });

      if (!user) {
        const newUser = {
          provider,
          name,
          email,
          customName: "",
          customBio: "",
        };
        const result = await db.collection("users").insertOne(newUser);
        user = await db.collection("users").findOne({ _id: result.insertedId });
      }

      res.cookie(`${provider}_access_token`, access_token, { signed: true });
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in user login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Endpoint for users, using "email" from the first endpoint
  router.get("/user/:email", async (req, res) => {
    const { email } = req.params;
    try {
      const user = await db.collection("users").findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user from database:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  // Update custom name and bio
  router.put("/user/update/:email", async (req, res) => {
    const { email } = req.params;
    const { customName, customBio } = req.body;
  
    try {
      const updateResult = await db.collection("users").updateOne(
        { email: email },
        { $set: { customName: customName, customBio: customBio } }
      );
  
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (updateResult.modifiedCount === 0) {
        return res.status(200).json({ message: "No changes made" });
      }
  
      res.json({ message: "User updated!" });
    } catch (error) {
      console.error("Error updating :", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Combined route for clearing cookies / log out
  router.delete("/", (req, res) => {
    res.clearCookie("google_access_token");
    res.clearCookie("microsoft_access_token");
    res.sendStatus(200);
  });

  return router;
}
