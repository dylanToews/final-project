const db = require("../../configs/db.config");

const getAllSounds = () => {
  return db.query("SELECT * FROM sounds;").then(data => {
    return data.rows;
  });
}

const getSoundsByUser = userId => {
  return db.query("SELECT * FROM sounds WHERE user_id = $1;", [userId])
    .then(data => data.rows);
}

module.exports = { getAllSounds, getSoundsByUser }