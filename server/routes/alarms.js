const express = require('express');
const router = express.Router();
const alarms = require("../db/queries/alarms");

// get alarms for user
// router.get("/:id", (req, res) => {
//   userID = req.params.id;
//   alarms.getAlarmsForUser(userID).then(data => {
//     res.json({alarms: data});
//   })

// });

router.get("/:email", (req, res) => {
  alarms.getAlarmDataByEmail(req.params.email).then((alarmItems) => res.json(alarmItems));
});

router.post("/", (req, res) => {
  const { newAlarmItem } = req.body;

  alarms.addAlarmItem(newAlarmItem).then((data) => res.json(data));
});

router.put("/edit", (req, res) => {
  console.log ("inside server?");
  const { updatedAlarmItem } = req.body;
  console.log("request body for update: ", updatedAlarmItem)

  alarms.updateAlarmItem(updatedAlarmItem).then((updatedAlarmInfo) => res.json(updatedAlarmInfo));
});

// for toggling active status on/off
router.put("/:id", (req, res) => {
  const alarmItemId = req.params.id;
  alarms.toggleAlarmActive(alarmItemId).then((data) => res.send(data));
});

router.delete("/:id", (req, res) => {
  const alarmItemId = req.params.id;
  alarms.deleteAlarmItem(alarmItemId).then((data) => res.send(data));
});


module.exports = router;