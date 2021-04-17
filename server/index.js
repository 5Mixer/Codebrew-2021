import express from "express";
import mongoose from "mongoose";
import blocklyRouter from "./routers/blocklyRouter.js"
import * as OpenID from 'express-openid-connect';

const auth = OpenID.auth;
const requiresAuth = OpenID.default.requiresAuth;
// console.log(Object.keys(OpenID.default));

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// For Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '38snkfskfnjkjfnkfniwu4rwfnskfdnskjfn3iu4fkfnskfnskjdfnskfdnsdkf',
  baseURL: 'http://localhost:5000',
  clientID: 'MvHq02XcmjKfNPek1K6jEQDvi0CTUa3U',
  issuerBaseURL: 'https://dev-aakwu9bc.au.auth0.com'
};
app.use(auth(config));

app.post("/api/createBot", (req, res) => {
  res.send("This is the api for creating bots");
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});