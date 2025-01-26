import mongoose from "mongoose";

export const blockSchema = new mongoose.Schema({
  text: { type: String, required: true },
  showInOption: { type: Boolean, default: true },
  isAnswer: { type: Boolean, default: false },
});

const Block = mongoose.model("Block", blockSchema);
export default Block;
