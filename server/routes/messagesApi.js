import { Router } from "express";
import { ObjectId } from "mongodb";

export function MessagesApi(db) {
  const router = new Router();
  const collection = db.collection("chatrooms");

  // Active Chat Room Stuff
  const messagesCollection = db.collection("messages");

  // Fetch messages from specific user
  router.get("/", async (req, res) => {
    try {
      const messages = await messagesCollection.find().toArray();
      res.json(messages);
    } catch (err) {
      res.status(500).send(`Error fetching messages: ${err.message}`);
    }
  });

  // Fetch messages from specific user
  router.get("/:userEmail", async (req, res) => {
    try {
      const { userEmail } = req.params;
      const messages = await messagesCollection
        .find({ userEmail: userEmail })
        .sort({ timestamp: 1 })
        .toArray();

      res.json(messages);
    } catch (err) {
      res.status(500).send(`Error fetching messages: ${err.message}`);
    }
  });

  router.put("/:userEmail", async (req, res) => {
    const { userEmail } = req.params;
    const { newCustomName } = req.body;

    try {
      await messagesCollection.updateMany(
        { userEmail: userEmail },
        { $set: { "name.profileName": newCustomName } },
      );

      res
        .status(200)
        .json({ message: "Names on messages updated successfully" });
    } catch (err) {
      res.status(500).send("Error updating names on messages");
    }
  });

  return router;
}
