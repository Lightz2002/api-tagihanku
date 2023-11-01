const express = require("express");

const app = express();
require("dotenv").config();

app.get("/", (req, res) => res.json({ message: "Docker is hard !!, test2" }));

console.log("test");

module.exports = app;
