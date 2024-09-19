const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");

module.exports = (app) => {
  app.use("/users", userRoutes);
};
