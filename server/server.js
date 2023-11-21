import express from "express";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

// Imports for later.

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

    // Routes and middleware for later

    // Ouath config Routes for Google and Microsoft

    // OAuth callback for ^

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
