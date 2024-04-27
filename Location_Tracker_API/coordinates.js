// Coordinates.js
const mongoose = require("mongoose");

var coordsSchema = new mongoose.Schema(
  {
    Latitude: Number,
    Longitude: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coordinates", coordsSchema);
