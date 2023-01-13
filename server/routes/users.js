const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');


/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});

router.get("/:email", (req, res) => {
  const userEmail = req.params.email;
  console.log("login attempt by ", userEmail);
  users.getUserByEmail(userEmail).then(data => {
    
    console.log(data);
    res.json({user: data});
  })

})

module.exports = router;