const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');

router.get("/:email", (req, res) => {
  const userEmail = req.params.email;

  users.getUserByEmail(userEmail).then(data => {

    res.json({user: data});
  })

})

module.exports = router;