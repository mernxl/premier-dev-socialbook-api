const express = require('express');
const { ObjectId } = require('mongodb');

const { UserModel } = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await UserModel.find().exec();  // get users cursor, convert to array

  res.send(users);
});

// sign-up to create user
router.post('/sign-up', async (req, res, next) => {
  try {
    const user = await UserModel.create(req.body);

    res.send(user);
  } catch (e) {
    next(e)
  }
});

// sign-in with user credentials
router.post('/sign-in', async (req, res, next) => {
  try {
    const user = await UserModel.findOne({email: req.body.email}).exec();

    if (user) {
      // use comparePassword method on userModel
      if (await user.comparePassword(req.body.password)) {
        return res.json(user)
      } else {
        return res.status(401).json({
          details: {
            password: 'Password is incorrect.'
          }
        })
      }
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e)
  }
});

// will get a particular user
router.get('/users/:id', async (req, res) => {
  // validate id as ObjectId
  if (ObjectId.isValid(req.params.id)) {
    let user = await UserModel.findOne({ _id: new ObjectId(req.params.id) }); // get a user by his _id

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router
