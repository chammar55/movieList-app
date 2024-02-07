const mongoose = require("mongoose");

const showListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: { type: String, required: true },
  status: { type: String, required: true }, //plan to watch / watching / completed
  myScore: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("userShowList", showListSchema);
