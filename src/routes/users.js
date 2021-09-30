const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const {
  getAllUsers, 
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

// get all users
router.get("/", auth, getAllUsers);

// get unique user
router.get("/:id", auth, getUserById);

// update a user
router.put("/update/:id", auth, updateUser);

// delete a user
router.delete("/delete/:id", auth, deleteUser);

module.exports = router;
