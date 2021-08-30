const express = require('express');
const router = express.Router();


// get all Posts
router.get("/", async (req, res) => {

});

// get unique post
router.get("/:id", async (req, res) => {
 
});

router.post('/', (req, res)=>{
    res.send(req.body);
})

module.exports = router;
