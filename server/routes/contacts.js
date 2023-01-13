const express = require('express');
const router = express.Router();
const contacts = require('../db/queries/contacts');

/* GET ALL contacts */
router.get("/", (req, res) => {
  contacts.getAllContacts().then(data => {
    console.log(data);
    res.json({contacts: data});
  })
});

module.exports = router;