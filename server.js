const cors = require("cors");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

//Configs
require("dotenv").config();
require("./config/dbConnection");

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());

// Define API Routes
const quizsRouter = require("./routes/quizs/quizs.router");

const base_url = process.env.API_ENDPOINT;
app.use(base_url + "quiz", quizsRouter);

// Start the server
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", function () {
  server.close();
  process.exit();
});
