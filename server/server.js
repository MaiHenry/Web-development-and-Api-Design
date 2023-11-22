import express from "express";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { WebSocketServer } from "ws";

import { ChatRoomApi } from "./routes/chatRoomApi.js";
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
    app.use("/api/chatroom", ChatRoomApi(db));

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
        res.json(userProfile); // Handle the user profile
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

    // WS
    const wsServer = new WebSocketServer({ noServer: true });

    // Keep a list of all incomings connections
    const sockets = [];
    let messageIndex = 0;

    // Start express app
    const server = app.listen(process.env.PORT || 3000);

    server.on("upgrade", (req, socket, head) => {
      wsServer.handleUpgrade(req, socket, head, (socket) => {
         sockets.push(socket);
         socket.on("message", (msg) => {
           try {
             const messageData = JSON.parse(msg);
             const id = messageIndex++;
             for (const recipient of sockets) {
               recipient.send(JSON.stringify({ name: messageData.name, userId: messageData.userId, content: messageData.content, timestamp: messageData.timestamp }));
             }
           } catch (err) {
             console.error("Error parsing message data:", err);
             socket.send(JSON.stringify({ error: "Invalid message data" }));
           }
         });
      });
     });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
