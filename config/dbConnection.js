const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log(
    `mongoose connection to ${process.env.DB_HOST}:${process.env.DB_PORT} successful!`
  );
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = mongoose.connection;
