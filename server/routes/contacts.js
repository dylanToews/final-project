const express = require('express');
const router = express.Router();
const contacts = require('../db/queries/contacts');

/* GET ALL contacts */
router.get("/", (req, res) => {
  contacts.getAllContacts().then(data => {

    res.json({contacts: data});
  })
});

// get contacts for user
router.get("/:id", (req, res) => {
  userID = req.params.id;
  contacts.getContactsForUser(userID).then(data => {

    res.json({contacts: data});
  })

});

module.exports = router;