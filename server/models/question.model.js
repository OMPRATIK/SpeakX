import mongoose from "mongoose";
import { blockSchema } from "./block.model.js";
import { optionSchema } from "./option.model.js";

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["ANAGRAM", "MCQ", "READ_ALONG", "CONTENT_ONLY"],
  },
  title: { type: String, required: true },
  anagramType: { type: String, enum: ["WORD", "SENTENCE"] },
  blocks: [blockSchema],
  options: [optionSchema],
  siblingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  solution: { type: String },
});

questionSchema.index({ title: "text" });
const Question = mongoose.model("Question", questionSchema);
export default Question;
