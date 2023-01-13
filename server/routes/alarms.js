const express = require('express');
const router = express.Router();
const alarms = require("../db/queries/alarms");

// get alarms for user
router.get("/:id", (req, res) => {
  userID = req.params.id;
  alarms.getAlarmsForUser(userID).then(data => {
    res.json({alarms: data});
  })

});

module.exports = router;