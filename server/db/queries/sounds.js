const db = require("../../configs/db.config");

const getAllSounds = () => {
  return db.query("SELECT * FROM sounds;").then(data => {
    return data.rows;
  });
}

const getSoundsForUser = userId => {
  return db.query("SELECT * FROM sounds WHERE user_id = $1;", [userId])
    .then(data => data.rows);
}

module.exports = { getAllSounds, getSoundsForUser }