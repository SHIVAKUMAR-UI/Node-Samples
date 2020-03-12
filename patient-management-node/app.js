const startUpDebugger = require("debug")("app:startup"); // To enable logs in debug mode command export DEBUG=app:startup
const dbDebugger = require("debug")("app:db"); // To enable DB related logs in debug mode command export DEBUG=app:db or export DEBUG=app:*
const config = require("config"); // Application configuration based on the environment
const morgan = require("morgan"); // Middle-ware For logging requests
const helmet = require("helmet"); // Middle-ware For setting headers for security
const Joi = require("joi"); // Middle-ware For validation
const logger = require("./logger"); // Custom Middle-ware for logging
const authenticate = require("./authentication"); // Custom Middle-ware for authentication
// const dbConnection = require("./dbconnection"); // Database connection setup
const express = require("express"); // For creating Restful API
const usersRoute = require("./routes/users");
const templateRoute = require("./routes/templates");
const app = express();
const mongodb = require("mongoose");
const cors = require("cors");

// Mongo db coonection
mongodb
  .connect("mongodb://localhost/patientmanagement")
  .then(() => {
    startUpDebugger(`Connected to MongoDb`);
  })
  .catch(() => {
    startUpDebugger(`Unable to connect to MongoDb`);
  });

// nodemon app.js to run the application in command prompt

// pug, mustache, ejs are the templating engines
app.set("view engine", "pug"); // Adding templating engine PUG
app.set("views", "./views"); // Default folder of views

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// To set env in commmand "export NODE_ENV = 'development'"
if (app.get("env") === "development") {
  startUpDebugger("Morgan Loggin enabled");
  app.use(morgan("tiny"));
}

app.use(logger);
app.use(authenticate);
// app.use(dbConnection);

startUpDebugger("Application Name: ", config.get("name"));
startUpDebugger("Mail Server: ", config.get("mail.server"));

dbDebugger("Db Enabled");
app.use(cors());
app.use('/', templateRoute);
app.use('/api/users', usersRoute);






const port = process.env.PORT || "3000";

app.listen(port, () => {
  startUpDebugger(`Listening on ${port} port...`);
});
