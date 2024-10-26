const mongoose = require("mongoose");
require("dotenv").config(); // Make sure dotenv is loaded before using process.env

mongoose
  .connect(process.env.BACK_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
