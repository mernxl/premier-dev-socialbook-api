const express = require('express');
const router = express.Router();
const ObjectID = require("mongodb").ObjectId;
const { PostsC } = require("../db");

// get all Posts
router.get("/", async (req, res) => {
  const post = await PostsC.find().toArray(); // get Posts cursor, convert to array
  res.send(post);
});

// get unique post
router.get("/:id", async (req, res) => {
  let id = "";
  if (ObjectID.isValid(req.params.id)) {
    id = new ObjectID(req.params.id);
  }
  const post = await PostsC.findOne({ _id: id });
  if (post) {
    res.send(post);
  } else {
    res.sendStatus(404);
    console.log("post not found. 404");
  }
});

router.post('/', (req, res)=>{
    res.send(req.body);
})

module.exports = router;
