const express = require('express');
const router = express.Router();
const ObjectID = require("mongodb").ObjectId;
const { UsersC } = require("../db");

// get all users
router.get("/", async (req, res) => {
  const users = await UsersC.find().toArray(); // get users cursor, convert to array
  res.send(users);
});

// get unique user
router.get("/:id", async (req, res) => {
  let id = "";
  if (ObjectID.isValid(req.params.id)) {
    id = new ObjectID(req.params.id);
  }
  const user = await UsersC.findOne({ _id: id });
  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
    console.log("User not found. 404");
  }
});

router.post('/', (req, res)=>{
    res.send(req.body);
})

module.exports = router;
