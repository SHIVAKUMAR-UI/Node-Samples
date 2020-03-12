const startUpDebugger = require("debug")("app:startup"); // To enable logs in debug mode command export DEBUG=app:startup
const express = require("express");
const Joi = require("joi"); // Middle-ware For validation
const userRoutes = express.Router();
const { User, validate } = require("../model/user");

// /api/user/101?sortBy=name
userRoutes.get("/:id", async (req, res) => {
  startUpDebugger("params ", req.params);
  startUpDebugger("query ", req.query);
  // res.send([req.params, req.query]);

  const user = await User.findById(id).select({
    firstName: 1,
    middleName: 1,
    lastName: 1,
    contactNumber: 1,
    email: 1,
    suite: 1,
    country: 1,
    province: 1,
    zipcode: 1
  });

  if (!user) res.status(404).send("Requested Id not found");
  res.send(user);
});

// Get All Users
userRoutes.get("/", async (req, res) => {
  console.log('Get All Users');
  const users = await User.find();
  res.send(users);
});

userRoutes.post("/", async (req, res) => {
  startUpDebugger("body", req.body);
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = new User(req.body);
  const result = await user.save();

  res.send(result);
});

// Update User
userRoutes.put("//:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const updatedUser = await User.update(
    { _id: id },
    {
      $set: {
        firstName: user.firstName
      }
    }
  );

  if (!updatedUser) res.status(404).send("No User with given Id");

  res.send(updatedUser);
});

// Delete user
userRoutes.delete("//:id", async (req, res) => {
  startUpDebugger("id", req.params.id);
  const deletedUser = await User.findByIdAndRemove(id);

  if (!deletedUser) return res.status(404).send("No User with given Id");

  res.send(deletedUser);
});

module.exports = userRoutes;
