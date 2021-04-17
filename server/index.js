import express from "express";
import mongoose from "mongoose";
import blocklyRouter from "./routers/blocklyRouter.js"


const app = express();

// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/api/createBot", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.use('api/blocklys', blocklyRouter)

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});