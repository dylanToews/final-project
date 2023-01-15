const db = require("../../configs/db.config");

const getAllContacts = () => {
  return db.query("SELECT * FROM contacts;").then(data => {

    return data.rows;
  });
}

const getContactsForUser = userId => {
  return db.query("SELECT * FROM contacts WHERE user_id = $1;", [userId])
    .then(data => data.rows);
}

module.exports = { getAllContacts, getContactsForUser }