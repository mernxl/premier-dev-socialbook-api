const router = require('express').Router();
const bcrypt = require("bcrypt");
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

// register
router.post('/login', async (req, res, next) => {
  const user = await User.findOne({email: req.body.email})
  const validPassword = await bcrypt.compare(req.body.password, user.password);

 if(validPassword){
   res.status(200).json({
    status: 200,
    message: "Valid user." // generate jwt now and set cookies
   })
 } else {
  res.status(404).json({
    status: 404,
    message: "Invalid credentials" // generate jwt now and set cookies
   })
 }
  // post login credetectionalse
})

router.post("/register", async (req, res) => {
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
      ...req.body,
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
});
module.exports = router;