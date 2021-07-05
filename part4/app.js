const express = require("express");
require("express-async-errors");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoUrl = config.MONGODB_URI;
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((resp) => {
    logger.info("The connection has been succesfuly made");
  })
  .catch((error) => {
    logger.error("There was an error connecting with mongoDB", error);
  });
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

module.exports = app;
