import express from "express";
import Blockly from "../models/blocklyModel.js";
import expressAsyncHandler from "express-async-handler";

const blocklyRouter = express.Router();

blocklyRouter.post(
  "/save",
  expressAsyncHandler(async (req, res) => {
    // await blockly.remove({});
    const createdBlocklys = await Blockly.insertOne(req.body);
    res.send({ createdBlocklys });
  })
);

export default blocklyRouter;