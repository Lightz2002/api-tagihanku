const express = require("express");

const app = express();
require("dotenv").config();

console.log(2);

app.get("/", (req, res) => res.json({ message: "Docker is hard !!, test2" }));

module.exports = app;
