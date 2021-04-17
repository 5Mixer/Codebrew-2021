import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slackToken: { type: String, required: false},
    discordToken: { type: String, required: false},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
