import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blocklyRouter from "./routers/blocklyRouter.js";
import userRouter from "./routers/userRouter.js";
import cors from "cors";
import { handle_bot_upload } from "./bots/handle_upload.js";

// console.log(Object.keys(OpenID.default));
dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/mongodblock", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.post("/api/createBot", (req, res) => {
  // array contains new bot objects created by the function
  // TODO: manage these
  new_bots = handle_bot_upload(req.body);

  res.status(200).end();
});

app.use("/api/blocklys", blocklyRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// If someone change port please let Peter know.
const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
