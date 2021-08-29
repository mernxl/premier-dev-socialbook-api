const router = require("express").Router();
const User = require("../models/User");


// get all users
router.get("/", async (req, res) => {
  const user = await User.find({});
  if (user.length > 0) {
    console.log("found user object", user);
    res.status(200).json(user);
  } else {
    res.status(500).json({
      error: "Found no users",
    });
  }
  // const users = await UsersC.find().toArray(); // get users cursor, convert to array
});

// get unique user
router.get("/:id", (req, res) => {
  const user = User.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        name: result.name,
        username: result.username,
        email: result.email,
        avatar: result.avatar,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          status: 500,
          message: "User not found",
        },
      });
    });
});

// checks if email and username exist


// update a user
router.put("/update/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(200).json({
        message: "User successfully updated",
        status: 200,
      });
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        status: 500,
        message: "could'\nt update user",
      });
    });
});

// delete a user
router.delete("/delete/:id", (req, res) => {
  const user = User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: "User successfully deleted",
        status: 200,
      });
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        status: 500,
        message: "could'\nt delete user",
      });
    });
});

module.exports = router;
