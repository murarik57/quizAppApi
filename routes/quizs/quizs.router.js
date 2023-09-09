const express = require("express");
const quizsRouter = express.Router();

const quizController = require("./quizs.controller");

quizsRouter.get("/:id", quizController.getOneQuiz);
quizsRouter.get("/", quizController.getAllQuiz);
quizsRouter.post("/", quizController.createOneQuiz);
quizsRouter.put("/:id", quizController.updateOneQuiz);
quizsRouter.delete("/:id", quizController.deleteOneQuiz);

module.exports = quizsRouter;
