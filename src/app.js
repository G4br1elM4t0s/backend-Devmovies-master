const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(router);

module.exports = app;
