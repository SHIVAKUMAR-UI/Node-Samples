const mongodb = require("mongoose");
const startUpDebugger = require("debug")("app:startup"); // To enable logs in debug mode command export DEBUG=app:startup

mongodb
  .connect("mongodb://localhost/patientmanagement")
  .then(() => {
    startUpDebugger(`Connected to MongoDb`);
  })
  .catch(() => {
    startUpDebugger(`Unable to connect to MongoDb`);
  });

const userSchema = new mongodb.Schema({
  fistName: String,
  middleName: String,
  lastName: String,
  contactNumber: String,
  email: String,
  suite: String,
  country: String,
  province: String,
  city: String,
  zipcode: String,
  userPhoto: Buffer,
  isActive: Boolean
});
// Number, Date, ObjectID, Array are the other datatypes

const User = mongodb.model("User", userSchema);

async function saveUser() {
  const user = new User({
    fistName: "Shiva",
    middleName: "kumar",
    lastName: "Kokkula",
    contactNumber: "7702655441",
    email: "shivakumar.kokkula@gmail.com",
    suite: "14-1",
    country: "India",
    province: "Hyderabad",
    city: "Hyderabad",
    Zipcode: "500018",
    isActive: true
  });
  const result = await user.save();
  startUpDebugger(`${result}`);
}

saveUser();

async function getActiveUsers() {
  const pageNumber = 2;
  const pageSize = 10;

  const result = await User.find({ isActive: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ firstName: 1 })
    .select({
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
  startUpDebugger(`${result}`);
}

getActiveUsers();

async function getActiveUsers(id) {
  const result = await User.find(id).select({
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
  startUpDebugger(`${result}`);
}

// getUserById(id);

async function updateUser(user) {
  const updatedUser = await User.update(
    { _id: id },
    {
      $set: {
        firstName: user.firstName
      }
    }
  );

  // To get record before update { new: false } after update { new: true }
  //   const updatedUser = await User.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: {
  //         firstName: user.firstName
  //       }
  //     },
  //     {
  //       new: true
  //     }
  //   );
  startUpDebugger(`${updatedUser}`);
}

async function deleteUserById(id) {
  const deletedUser = await User.findByIdAndRemove(id);
  User.remove(id);
}

// module.exports = mongodb;

/**
 *  comparison operations
 *  eq (equal)
 *  ne (not equal)
 *  gt (greater than)
 *  gte (greater than equal)
 *  lt (less than)
 *  lte (less than equal)
 *  in
 *  nin (not in)
 */
