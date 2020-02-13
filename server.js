/* jshint esversion: 6 */
const express = require("express");

const server = express();
server.use(express.json());

const userRouter = require("./users/userRouter.js");

// Logger MiddleWare execution
server.use(logger);

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
