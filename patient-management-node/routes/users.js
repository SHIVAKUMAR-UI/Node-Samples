const startUpDebugger = require("debug")("app:startup"); // To enable logs in debug mode command export DEBUG=app:startup
const express = require('express');
const Joi = require("joi"); // Middle-ware For validation
const userRoutes = express.Router();



const users = [
    { id: 1, name: "user 1" },
    { id: 2, name: "user 2" },
    { id: 3, name: "user 3" }
  ];

// /api/user/101?sortBy=name
userRoutes.get("/:id", (req, res) => {
    startUpDebugger("params ", req.params);
    startUpDebugger("query ", req.query);
    // res.send([req.params, req.query]);
    const user = users.find(user => {
      return user.id == req.params.id;
    });
    if (!user) res.status(404).send("Requested Id not found");
    res.send(user);
  });
  
  // Get All Users
  userRoutes.get("/", (req, res) => {
    res.send(users);
  });
  
  userRoutes.post("/", (req, res) => {
    startUpDebugger("body", req.body);
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = {
      id: users.length + 1,
      name: req.body.name
    };
    users.push(user);
    res.send(user);
  });
  
  // Update User
  userRoutes.put("//:id", (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const user = users.find(user => {
      return user.id == parseInt(req.params.id);
    });
  
    if (!user) res.status(404).send("No User with given Id");
  
    user.name = req.body.name;
    res.send(user);
  });
  
  // Delete user
  userRoutes.delete("//:id", (req, res) => {
    startUpDebugger("id", req.params.id);
    const userIndex = users.findIndex(user => {
      return user.id === parseInt(req.params.id);
    });
  
    if (userIndex === -1) return res.status(404).send("No User with given Id");
  
    users.splice(userIndex, 1);
    res.send(users);
  });
  
  function validateUser(user) {
    const userSchema = {
      id: Joi.number(),
      name: Joi.string()
        .min(3)
        .required()
    };
    return Joi.validate(user, userSchema);
  }

  module.exports = userRoutes;