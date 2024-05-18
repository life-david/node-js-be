require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const appRoutes = require("./routes");
// const compression = require('compression');
// const helmet = require('helmet');
const app = express();

//init middelwares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", appRoutes);
// app.use(helmet())
// app.use(compression());

//init db
require("./database/init.mongodb");

//handling error
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).json({
        status: "error",
        code: status,
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
