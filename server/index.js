import express from "express";
import mongoose from "mongoose";
import blocklyRouter from "./routers/blocklyRouter.js"


const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mongodblock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.post("/api/createBot", (req, res) => {
  console.log(res.body);
  res.send(res.body);
});

app.use('api/blocklys', blocklyRouter)

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});