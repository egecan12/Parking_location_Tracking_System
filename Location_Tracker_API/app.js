require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticate = require("./auth");
const connectDB = require("./db");
const Coordinates = require("./coordinates");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

connectDB();

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/getCoords", authenticate, async (req, res, next) => {
  try {
    const coords = await Coordinates.find().sort({ CreatedAt: -1 }).limit(1);
    res.json(coords);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/addCoords", authenticate, async (req, res) => {
  try {
    let myCoordinates = new Coordinates(req.body);
    await myCoordinates.save();
    res.status(201).send("Successfully created");
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad request");
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});
