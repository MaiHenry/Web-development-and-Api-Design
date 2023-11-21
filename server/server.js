import express from "express";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

import { LoginApi } from "./routes/loginApi.js";
import { googleConfig, microsoftConfig, fetchUser } from "./config.js";

dotenv.config();
let db;

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// MongoDB connection setup
const mongoClient = new MongoClient(process.env.MONGODB_URI);

mongoClient
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = mongoClient.db("webutvikling");
    app.use("/api/login", LoginApi());

    // Ouath config Routes
    app.get("/auth/google/config", async (req, res) => {
      try {
        const config = await googleConfig();
        res.json(config);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/auth/microsoft/config", async (req, res) => {
      try {
        const config = await microsoftConfig();
        res.json(config);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // OAuth callback
    app.post("/auth/callback", async (req, res) => {
      const { access_token, provider } = req.body;
      try {
        const config =
          provider === "google"
            ? await googleConfig()
            : await microsoftConfig();
        const userProfile = await fetchUser(access_token, config);
        // Handle the user profile (e.g., creating a session, storing in the database)
        res.json(userProfile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user profile" });
      }
    });

    // For serving static files and routes
    app.use(express.static(path.resolve("../client/dist")));
    app.use((req, res, next) => {
      if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
      } else {
        next();
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
      console.log(`https://pg6301-f1fe83ab10e3.herokuapp.com/`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
