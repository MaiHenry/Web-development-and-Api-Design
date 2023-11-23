const request = require("supertest");
const express = require("express");
const app = express();

app.get("/profile", (req, res) => {
  res.status(200).json({ message: "Hi Chatroom" });
});

app.get("/api/login", (req, res) => {
  res.status(200).json({ message: "Login API" });
});

describe("Server Test", () => {
  it("return message when GET request '/profile'", async () => {
    const response = await request(app).get("/profile");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hi Chatroom");
  });

  it("return message when GET request '/api/login'", async () => {
    const response = await request(app).get("/api/login");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login API");
  });
});
