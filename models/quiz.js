const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    options_a: {
      type: String,
      required: true,
    },
    options_b: {
      type: String,
      required: true,
    },
    options_c: {
      type: String,
      required: true,
    },
    options_d: {
      type: String,
      required: true,
    },
    options_e: String,
  },
  correct_option: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
