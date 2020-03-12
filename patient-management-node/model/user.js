const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  contactNumber: String,
  email: String,
  suite: String,
  country: String,
  state: String,
  city: String,
  zipcode: String,
  userPhoto: Buffer,
  isActive: Boolean
});
// Number, Date, ObjectID, Array are the other datatypes

const user = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .required(),
    middleName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(3)
      .required(),
    contactNumber: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(3)
      .required(),
    suite: Joi.string()
      .min(3)
      .required(),
    country: Joi.string()
      .required(),
    state: Joi.string()
      .required(),
    city: Joi.string()
      .required(),
    zipcode: Joi.string()
      .required(),
    userPhoto: Joi.string(),
    isActive: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

exports.User = user;
exports.validate = validateUser;
