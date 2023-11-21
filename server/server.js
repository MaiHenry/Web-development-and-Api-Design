import express from "express";

const app = express();
app.use(express.static("../client/dist")) // Use static files under client/dist
app.listen(process.env.PORT || 3000);