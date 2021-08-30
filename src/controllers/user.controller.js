const User = require("../models/User");

exports.getAllUsers =  async (req, res) => {
  const user = await User.find({});
  if (user.length > 0) {
    console.log("found user object", user);
    res.status(200).json(user);
  } else {
    res.status(500).json({
      error: "Found no users",
    });
  }
}

exports.getUserById = (req, res) => {
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
}

exports.updateUser = async (req, res) => {
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
}

exports.deleteUser = (req, res) => {
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
}