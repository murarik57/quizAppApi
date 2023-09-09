const mongoose = require("mongoose");
const Quiz = require("../../models/quiz");

const quizController = {
  getAllQuiz: async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOneQuiz: async (req, res) => {
    const quizId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }
    try {
      const quiz = await Quiz.findById(quizId);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createOneQuiz: async (req, res) => {
    try {
      const { question, options, correct_option, category, difficulty } =
        req.body;

      const missingFields = [];

      if (!question) missingFields.push("question");
      if (!options) missingFields.push("options");
      if (!correct_option || Object.keys(correct_option).length < 4)
        missingFields.push("correct_option");
      if (!category) missingFields.push("category");
      if (!difficulty) missingFields.push("difficulty");

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `The following fields are missing: ${missingFields.join(
            ", "
          )}`,
        });
      }

      const newQuiz = new Quiz({
        question,
        options,
        correct_option,
        category,
        difficulty,
      });

      await newQuiz.save();
      res
        .status(201)
        .json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateOneQuiz: async (req, res) => {
    const quizId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }
    try {
      const quizId = req.params.id;

      const quiz = await Quiz.findById(quizId);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      quiz.question = req.body.question || quiz.question;
      quiz.options = req.body.options || quiz.options;
      quiz.correct_option = req.body.correct_option || quiz.correct_option;
      quiz.category = req.body.category || quiz.category;
      quiz.difficulty = req.body.difficulty || quiz.difficulty;

      if (req.body.active !== undefined) {
        quiz.active = req.body.active;
      }

      await quiz.save();

      res.json({ message: "Quiz updated successfully", quiz });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteOneQuiz: async (req, res) => {
    const quizId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    try {
      const quizId = req.params.id;
      const deletedQuiz = await Quiz.deleteOne({ _id: quizId });

      if (deletedQuiz.deletedCount === 0) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = quizController;
