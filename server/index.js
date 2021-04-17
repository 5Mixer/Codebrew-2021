import express from "express";
import mongoose from "mongoose";
import blocklyRouter from "./routers/blocklyRouter.js"
import * as OpenID from 'express-openid-connect';
import cors from "cors";
import {handle_bot_upload} from "./bots/handle_upload.js";

const auth = OpenID.auth;
const requiresAuth = OpenID.default.requiresAuth;
// console.log(Object.keys(OpenID.default));

const app = express();

app.use(cors({ origin: "http://localhost:3000"}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mongodblock', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// For Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '38snkfskfnjkjfnkfniwu4rwfnskfdnskjfn3iu4fkfnskfnskjdfnskfdnsdkf',
  baseURL: 'http://localhost:5005',
  clientID: 'MvHq02XcmjKfNPek1K6jEQDvi0CTUa3U',
  issuerBaseURL: 'https://dev-aakwu9bc.au.auth0.com'
};
app.use(auth(config));

app.post("/api/createBot", (req, res) => {
  // array contains new bot objects created by the function
  // TODO: manage these
  new_bots = handle_bot_upload(req.body);

  res.status(200).end();
});

app.use('api/blocklys', blocklyRouter)

app.get("/", (req, res) => {
  // res.send("Server is Running");
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
  // User information to stdout
  console.log(req.oidc.user);

});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// If someone change port please let Peter know.
const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});