const express = require('express');
const templateRoutes = express.Router();

templateRoutes.get("/", (req, res) => {
    //   res.send("Hello world!");
    res.render("index", { title: "My title", name: "Hello Template View with PUG" }); // Return pug templates with the response
  });

module.exports = templateRoutes;