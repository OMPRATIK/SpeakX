import mongoose from "mongoose";

export const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrectAnswer: { type: Boolean, default: false },
});

const Option = mongoose.model("Option", optionSchema);
export default Option;
