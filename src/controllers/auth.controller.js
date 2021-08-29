require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User  = require('../models/User');

// find a user with unique id
async function findUniqueUser(credentials = {}) {
  const user = await User.find(credentials);
  if (user.length > 0) {
    console.log("found user object", user);
    return true;
  }
  return false;
}

exports.register = async (req, res, next) => {
  // crosscheck for unique user
  const credentials = {
    name: req.body.name,
    email: req.body.email,
  };
  if (await findUniqueUser(credentials)) {
    res.status(501).json({
      message: "User with name or email already exist",
      status: 501,
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await new User({
      ...req.body, avatar: req.file.path,
      password: hashedPassword,
    });

    user
      .save()
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(501).json({
          error: "Counld'\nt save user",
          status: 501,
        })
      );
  }
}

exports.login =  async (req, res, next) => {
  const user = await User.findOne({email: req.body.email})
  if(user){
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(validPassword){
      const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "1h"
      })
      res.status(200).json({
       status: 200,
       message: "Valid user.",
       email: user.email,
       token: token // generate jwt now and set cookies
      })
    } else {
     res.status(401).json({
       status: 401,
       message: "Invalid credentials" // generate jwt now and set cookies
      })
    }
  } else {
    res.status(401).json({
      status: 401,
      message: "Auth failed "// generate jwt now and set cookies
     })
  }
 
 
  // post login credetectionalse
}
