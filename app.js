/**
* Simple dice roller
*  Provides an example of a simple app for rolling dice
*  Copyright 2017 - Mat Hunter
*/

"use strict";

// Constants
const PORT = 3000;

// Imports
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const rollDice = require("./roll-dice");

// Set up Express
const app = express();

// Set up the middleware
// - Logging
app.use(morgan("short"));

// - Static files
app.use(express.static(path.resolve(__dirname, "static")));

// - Roll
app.get("/roll/:formula", (req, res, next) => {
  try {
    var result = rollDice(req.params.formula);
    res.status(200).json({result: result});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// - 404 handler
app.use((req, res) => {
  res.status(404).send("Not found");
});

// Start the app
app.listen(PORT, () => {
  console.log("Application started listening on " + PORT);
});
