const express = require('express');
const { ObjectId } = require('mongodb');

const { PostModel } = require('./model');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await PostModel.find().exec(); // get posts cursor, convert to array

  res.send(posts); // will stringify, set json headers, set status code
});

// will get a particular post
router.get('/:id', async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    let post = await PostModel.findOne({ _id: new ObjectId(req.params.id) }); // get a post by _id

    if (post) {
      res.send(post);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400).send("User ID does not meet the required standards");
  }
});

module.exports = router;
