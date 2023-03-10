const express = require('express');
const router = express.Router();
const sounds = require("../db/queries/sounds");

/* GET ALL sounds */
router.get("/", (req, res) => {
  sounds.getAllSounds().then(data => {

    res.json({sounds: data});
  })
});

// get sounds for user
router.get("/:id", (req, res) => {
  userID = req.params.id;
  sounds.getSoundsForUser(userID).then(data => {

    res.json({sounds: data});
  })

});

module.exports = router;