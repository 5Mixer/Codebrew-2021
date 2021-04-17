import mongoose from "mongoose";

const blocklySchema = new mongoose.Schema(
  {
    xml: { type: String, required: true },
    username: { type: String, required: false, unique: true },
  },
  {
    timestamps: true,
  }
);

const Blockly = mongoose.model("blockly", blocklySchema);
export default Blockly;