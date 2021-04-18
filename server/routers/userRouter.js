import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log("Loginned success");
        console.log(user);
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.input.name,
      email: req.body.input.email,
      password: bcrypt.hashSync(req.body.input.password, 8),
    });
    console.log("Register success");
    const createdUser = await user.save();
    console.log(createdUser);
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  })
);

userRouter.post(
  "/saveTokens",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const updatedUser = await User.update(
      { _id: req.user._id },
      {
        dicordToken: req.body.input.discordToken,
        slackToken: req.body.input.slackToken,
      }
    );

    res.send({
      _id: updatedUser._id,
      email: updatedUser.email,
      slackToken: updatedUser.slackToken,
      discordToken: updatedUser.discordToken,
    });
  })
);

export default userRouter;
