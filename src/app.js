const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("./database/init.mongodb");
require("dotenv").config();
const appRoutes = require("./routes");
const app = express();

// cors
app.use(
  cors({
    origin: "*",
  })
);
//init middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
// routes
app.use("/api", appRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World!",
  });
});

//handling error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  // const method = req.method;
  // const path = req.path;

  res.status(status).json({
    // method: method,
    // path: path,
    status: status,
    message: error.message,
  });
});

module.exports = app;
