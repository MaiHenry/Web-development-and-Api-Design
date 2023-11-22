import { Router } from "express";
import { ObjectId } from "mongodb";

export function ChatRoomApi(db) {
  const router = new Router();
  const collection = db.collection("chatrooms");

  // Fetch all Rooms
  router.get("/", async (req, res) => {
    try {
      const chatRooms = await collection.find().toArray();
      res.json(chatRooms);
    } catch (err) {
      res.status(500).send("Error fetching rooms");
    }
  });

  // Fetch a single room by ID
  router.get("/:id", async (req, res) => {
    try {
      const chatRoom = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!chatRoom) {
        return res.status(404).send("That room doesn't exist");
      }
      res.json(chatRoom);
    } catch (err) {
      res.status(500).send(`Error fetching that room: ${err.message}`);
    }
  });

  // Add a new room
  router.post("/add", async (req, res) => {
    const { name, description, userEmail } = req.body;
    try {
      const existingChatRoom = await collection.findOne({ name });
      if (existingChatRoom) {
        return res.status(400).send("A room with this name already exists");
      }

      await collection.insertOne({ name, description, userEmail });
      res.status(201).json({ message: "Room added successfully" });
    } catch (err) {
      res.status(500).send("Error adding room");
    }
  });

  // Delete a room by ID
  router.delete("/:id", async (req, res) => {
    try {
      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (result.deletedCount === 0) {
        return res.status(404).send("No room found with this id");
      }
      res.status(200).send("Room deleted successfully");
    } catch (err) {
      res.status(500).send("Error deleting room");
    }
  });

  // Update room
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { userEmail, ...updateData } = req.body;

    try {
      const room = await collection.findOne({ _id: new ObjectId(id) });
      if (!room) {
        return res.status(404).send("No room found");
      }

      if (room.userEmail !== userEmail) {
        return res.status(403).send("Only creator can edit");
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).send("No room found with this id");
      }
      res.status(200).json({ message: "Room updated successfully" });
    } catch (err) {
      res.status(500).send("Error updating chat room");
    }
  });

  // Active Chat Room Stuff
  const messagesCollection = db.collection("messages");

  // Fetch messages from specific room
  router.get("/:id/messages", async (req, res) => {
    try {
      const roomId = new ObjectId(req.params.id);
      const messages = await messagesCollection
        .find({ chatRoomId: roomId })
        .sort({ timestamp: 1 })
        .toArray();
      res.json(messages);
    } catch (err) {
      res.status(500).send(`Error fetching messages: ${err.message}`);
    }
  });

  // Add a new message to a specific room
  router.post("/:roomId/messages", async (req, res) => {
    const { roomId } = req.params;
    const { name, userId, content } = req.body;

    try {
      const newMessage = {
        name,
        chatRoomId: new ObjectId(roomId),
        userId: new ObjectId(userId),
        content,
        timestamp: new Date(),
      };

      await messagesCollection.insertOne(newMessage);
      res.status(201).json({ message: "Message sent" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error sending message");
    }
  });

  return router;
}
