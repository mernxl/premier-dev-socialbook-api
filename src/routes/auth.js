const router = require('express').Router();
const multer  = require('multer');
const { login, register} = require('../controllers/auth.controller');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb)=>{
    cb(null, new Date().toISOString() + file.originalname);
  }
})
const upload = multer({ storage });

//login
router.post('/login', login)

// register
router.post("/register", upload.single('avatar') , register );

module.exports = router;